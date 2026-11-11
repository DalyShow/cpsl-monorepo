"use server";

import { headers } from "next/headers";
import { createClient } from "next-sanity";
import { Resend } from "resend";
import type { FormBlockState } from "@cpsl/ui";

// Must match FORM_HONEYPOT_NAME in @cpsl/ui form-block.tsx (a "use client"
// module, so its constants can't be read as values from server code).
const FORM_HONEYPOT_NAME = "company_website";

/**
 * Delivers a page-builder Form block submission by email (Resend).
 *
 * The browser only sends `_formKey` = "<documentId>:<blockKey>". Recipients,
 * subject and the field definitions are read from the *published* Sanity
 * document here on the server, so a visitor can't redirect mail or inject
 * fields the editor didn't create.
 */

const FROM = process.env.FORM_FROM_EMAIL || "CPSL Website <noreply@carolinapremiersoccerleague.com>";

const sanity = createClient({
  projectId:   process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset:     process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion:  "2024-01-01",
  useCdn:      false,
  perspective: "published",
});

interface StoredField {
  _key:      string;
  label?:    string;
  type?:     string;
  required?: boolean;
  options?:  string[];
}

interface StoredForm {
  pageTitle?:  string;
  pagePath?:   string;
  recipients?: string[];
  subject?:    string;
  fields?:     StoredField[];
}

const FORM_QUERY = `*[_id == $docId][0]{
  "pageTitle": coalesce(title, "Home"),
  "pagePath": select(_type == "homePage" => "/", defined(parent) => "/" + parent->slug.current + "/" + slug.current, "/" + slug.current),
  "form": sections[_key == $blockKey && _type == "formBlock"][0]{ recipients, subject, fields }
}`;

// Best-effort per-instance IP rate limit (same approach as /apply).
const WINDOW_MS = 60_000;
const MAX_HITS  = 3;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const limited = recent.length >= MAX_HITS;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return limited;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function submitForm(_prev: FormBlockState, data: FormData): Promise<FormBlockState> {
  // Honeypot: pretend it worked so bots don't adapt.
  if (String(data.get(FORM_HONEYPOT_NAME) ?? "").trim()) return { success: true };

  const h  = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { error: "Too many submissions. Please wait a minute and try again." };

  const [rawDocId, blockKey] = String(data.get("_formKey") ?? "").split(":");
  const docId = rawDocId?.replace(/^drafts\./, "");
  if (!docId || !blockKey) return { error: "This form isn't set up correctly." };

  let stored: (Omit<StoredForm, "recipients" | "subject" | "fields"> & { form?: StoredForm | null }) | null = null;
  try {
    stored = await sanity.fetch(FORM_QUERY, { docId, blockKey });
  } catch (err) {
    console.error("[form] Sanity lookup failed:", err);
    return { error: "Something went wrong. Please try again." };
  }
  const form = stored?.form;
  if (!form) return { error: "This form isn't published yet." };

  const recipients = (form.recipients ?? []).filter((r) => EMAIL_RE.test(r));
  if (recipients.length === 0) {
    console.error(`[form] No recipients on ${docId}:${blockKey}`);
    return { error: "This form has no destination set up yet." };
  }

  // Validate against the stored field definitions, not what the browser sent.
  const fieldErrors: Record<string, string> = {};
  const rows: { label: string; value: string }[] = [];
  let replyTo: string | undefined;

  for (const f of form.fields ?? []) {
    const label = f.label?.trim() || "Field";
    const raw   = String(data.get(f._key) ?? "").trim().slice(0, f.type === "textarea" ? 5000 : 500);
    let value   = raw;

    if (f.type === "checkbox") value = raw ? "Yes" : "No";
    if (f.required && (f.type === "checkbox" ? !raw : !value)) {
      fieldErrors[f._key] = f.type === "checkbox" ? "Please tick this box." : "This field is required.";
      continue;
    }
    if (f.type === "email" && value) {
      if (!EMAIL_RE.test(value)) { fieldErrors[f._key] = "Enter a valid email address."; continue; }
      replyTo ??= value;
    }
    if (f.type === "select" && value && !(f.options ?? []).includes(value)) {
      fieldErrors[f._key] = "Choose one of the options."; continue;
    }
    rows.push({ label, value: value || "—" });
  }
  if (Object.keys(fieldErrors).length) {
    return { error: "Please fix the highlighted fields.", fieldErrors };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[form] RESEND_API_KEY is not set");
    return { error: "Sending is temporarily unavailable. Please try again later." };
  }

  const subject  = form.subject?.trim() || "New website enquiry";
  const pageInfo = `${stored?.pageTitle ?? ""} (${stored?.pagePath ?? ""})`;
  const text = [
    ...rows.map((r) => `${r.label}: ${r.value}`),
    "",
    `Sent from the website form on ${pageInfo}`,
  ].join("\n");
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;color:#091628;">
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5A6577;margin:0 0 6px;">Website form</p>
      <h1 style="font-size:20px;margin:0 0 20px;">${esc(subject)}</h1>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #E2E5EA;">
        ${rows.map((r) => `
          <tr>
            <td style="padding:10px 12px 10px 0;border-bottom:1px solid #E2E5EA;font-size:13px;color:#5A6577;vertical-align:top;width:160px;">${esc(r.label)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #E2E5EA;font-size:14px;white-space:pre-wrap;">${esc(r.value)}</td>
          </tr>`).join("")}
      </table>
      <p style="font-size:12px;color:#5A6577;margin:20px 0 0;">Sent from ${esc(pageInfo)}${replyTo ? " · Reply to this email to answer the sender." : ""}</p>
    </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: FROM, to: recipients, replyTo, subject, text, html });
    if (error) {
      console.error("[form] Resend error:", error);
      return { error: "Your message couldn't be sent. Please try again." };
    }
  } catch (err) {
    console.error("[form] Resend threw:", err);
    return { error: "Your message couldn't be sent. Please try again." };
  }

  return { success: true };
}
