"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
  success?: boolean;
  error?: string;
};

export async function submitApplication(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const clubName     = (formData.get("clubName")     as string)?.trim();
  const location     = (formData.get("location")     as string)?.trim();
  const contactName  = (formData.get("contactName")  as string)?.trim();
  const contactEmail = (formData.get("contactEmail") as string)?.trim();
  const contactPhone = (formData.get("contactPhone") as string)?.trim();
  const ageGroups    = formData.getAll("ageGroups")  as string[];

  // Validation
  if (!clubName || !location || !contactName || !contactEmail || !contactPhone) {
    return { error: "Please fill in all required fields." };
  }
  if (ageGroups.length === 0) {
    return { error: "Please select at least one age group." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail)) {
    return { error: "Please enter a valid email address." };
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const token  = process.env.AIRTABLE_TOKEN;

  // Submit to Airtable
  try {
    const res = await fetch(`https://api.airtable.com/v0/${baseId}/Applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Club Name":     clubName,
              "Location":      location,
              "Contact Name":  contactName,
              "Contact Email": contactEmail,
              "Contact Phone": contactPhone,
              "Age Groups":    ageGroups,
              "Status":        "Pending",
              "Submitted At":  new Date().toISOString().split("T")[0],
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Airtable error:", err);
      return { error: "Submission failed. Please try again." };
    }
  } catch (err) {
    console.error("Airtable fetch error:", err);
    return { error: "Submission failed. Please try again." };
  }

  // Send confirmation email (non-blocking — don't fail if email errors)
  try {
    await resend.emails.send({
      from: "CPSL <noreply@carolinapremiersoccerleague.com>",
      to: contactEmail,
      subject: "CPSL — Membership Application Received",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#041124;">
          <div style="padding:32px;text-align:center;border-bottom:1px solid #1E2D45;">
            <p style="color:#D4B949;font-size:22px;font-weight:900;letter-spacing:3px;margin:0;">CPSL</p>
            <p style="color:#64748B;font-size:11px;letter-spacing:2px;margin:6px 0 0;text-transform:uppercase;">Carolina Premier Soccer League</p>
          </div>
          <div style="padding:40px 32px;">
            <h1 style="color:#F4EFE6;font-size:24px;margin:0 0 16px;">Application Received</h1>
            <p style="color:#94A3B8;font-size:15px;line-height:1.7;margin:0 0 28px;">
              Thank you, ${contactName}. We've received your membership application for
              <strong style="color:#F4EFE6;">${clubName}</strong>.
              Our team will review it and be in touch shortly.
            </p>
            <div style="background:#041124;border:1px solid #1E2D45;padding:24px;margin-bottom:24px;">
              <p style="color:#64748B;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Application Summary</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="color:#64748B;font-size:13px;padding:6px 0;width:140px;">Club</td><td style="color:#F4EFE6;font-size:13px;padding:6px 0;">${clubName}</td></tr>
                <tr><td style="color:#64748B;font-size:13px;padding:6px 0;">Location</td><td style="color:#F4EFE6;font-size:13px;padding:6px 0;">${location}</td></tr>
                <tr><td style="color:#64748B;font-size:13px;padding:6px 0;vertical-align:top;">Age Groups</td><td style="color:#F4EFE6;font-size:13px;padding:6px 0;">${ageGroups.join(", ")}</td></tr>
              </table>
            </div>
            <p style="color:#64748B;font-size:13px;line-height:1.6;margin:0;">
              If you have any questions in the meantime, feel free to reach out via our website.
            </p>
          </div>
          <div style="padding:24px 32px;border-top:1px solid #1E2D45;text-align:center;">
            <p style="color:#475569;font-size:12px;margin:0;">© ${new Date().getFullYear()} Carolina Premier Soccer League. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    // Email failure is non-fatal — record is already saved in Airtable
    console.error("Resend error:", err);
  }

  return { success: true };
}
