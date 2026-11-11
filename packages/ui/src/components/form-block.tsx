"use client"

import * as React from "react"
import { startTransition, useActionState, useId } from "react"
import { ArrowPillButton } from "./arrow-pill-button"

export type FormBlockBackground = "white" | "cream" | "surface" | "navy" | "gold"
export type FormFieldType = "text" | "email" | "tel" | "textarea" | "select" | "checkbox"

export interface FormField {
  /** Stable key used as the input `name` (the Sanity array `_key` on the website). */
  name:         string
  label:        string
  type:         FormFieldType
  required?:    boolean
  placeholder?: string
  /** Choices for `select` fields. */
  options?:     string[]
  /** `half` pairs two fields side by side from tablet up. Default `full`. */
  width?:       "full" | "half"
  helpText?:    string
}

export interface FormBlockState {
  success?:     boolean
  error?:       string
  /** Per-field messages keyed by `FormField.name`. */
  fieldErrors?: Record<string, string>
}

export type FormBlockAction = (prev: FormBlockState, data: FormData) => Promise<FormBlockState>

export interface FormBlockProps {
  eyebrow?:        string
  headline?:       string
  intro?:          string
  fields?:         FormField[]
  submitLabel?:    string
  successTitle?:   string
  successMessage?: string
  background?:     FormBlockBackground
  /** Identifies this form to the server action (sent as hidden `_formKey`). */
  formKey?:        string
  /** Server action that delivers the submission. When omitted (docs preview)
   *  the form fakes a successful submit so the success state can be seen. */
  action?:         FormBlockAction
}

/** Hidden honeypot input name — the server treats a filled value as a bot. */
export const FORM_HONEYPOT_NAME = "company_website"

const DEFAULT_FIELDS: FormField[] = [
  { name: "name",    label: "Name",    type: "text",  required: true, width: "half" },
  { name: "email",   label: "Email",   type: "email", required: true, width: "half" },
  { name: "club",    label: "Club",    type: "text",  width: "half" },
  { name: "topic",   label: "Topic",   type: "select", width: "half", options: ["General question", "Club membership", "Schedules & fixtures", "Media"] },
  { name: "message", label: "Message", type: "textarea", required: true },
]

const outerBgMap: Record<FormBlockBackground, string> = {
  white:   "#FFFFFF",
  cream:   "#F4EFE6",
  surface: "#F4F6FA",
  navy:    "#091628",
  gold:    "#C9A74C",
}

type Tone = "dark" | "light"
const toneMap: Record<FormBlockBackground, Tone> = {
  white: "dark", cream: "dark", surface: "dark", navy: "light", gold: "dark",
}

const palette: Record<Tone, {
  text: string; muted: string; label: string; border: string; borderHover: string
  fieldBg: string; focus: string; error: string
}> = {
  dark: {
    text:        "#091628",
    muted:       "#5A6577",
    label:       "rgba(9, 22, 40, 0.62)",
    border:      "rgba(9, 22, 40, 0.18)",
    borderHover: "rgba(9, 22, 40, 0.36)",
    fieldBg:     "rgba(255, 255, 255, 0.72)",
    focus:       "#091628",
    error:       "#B42335",
  },
  light: {
    text:        "#F4EFE6",
    muted:       "rgba(244, 239, 230, 0.72)",
    label:       "rgba(244, 239, 230, 0.62)",
    border:      "rgba(244, 239, 230, 0.20)",
    borderHover: "rgba(244, 239, 230, 0.40)",
    fieldBg:     "rgba(244, 239, 230, 0.06)",
    focus:       "#C9A74C",
    error:       "#FF8A94",
  },
}

const demoAction: FormBlockAction = async () => {
  await new Promise((r) => setTimeout(r, 700))
  return { success: true }
}

export function FormBlock({
  eyebrow        = "Get in touch",
  headline       = "CONTACT THE LEAGUE",
  intro          = "Questions about membership, fixtures or anything else — send us a note and the league office will reply within two working days.",
  fields         = DEFAULT_FIELDS,
  submitLabel    = "Send message",
  successTitle   = "Message sent",
  successMessage = "Thanks — we've got it and will be in touch soon.",
  background     = "cream",
  formKey,
  action,
}: FormBlockProps) {
  const [state, dispatch, pending] = useActionState<FormBlockState, FormData>(
    action ?? demoAction,
    {},
  )
  const uid  = useId()
  const id   = "cpsl-form"
  const tone = toneMap[background]
  const c    = palette[tone]

  // Submit through onSubmit (not the `action` attribute) so React doesn't
  // reset the inputs when the server returns a validation error.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(() => dispatch(data))
  }

  const cssVars = {
    "--form-text":         c.text,
    "--form-muted":        c.muted,
    "--form-label":        c.label,
    "--form-border":       c.border,
    "--form-border-hover": c.borderHover,
    "--form-field-bg":     c.fieldBg,
    "--form-focus":        c.focus,
    "--form-error":        c.error,
    background:            outerBgMap[background],
    // 30px top matches the site gutter rule: the LogoTicker has 0 bottom
    // padding and relies on the next module's 30px top for equal spacing.
    padding:               "30px clamp(20px, 5vw, 30px) clamp(56px, 8vw, 88px)",
  } as React.CSSProperties

  return (
    <section style={cssVars}>
      <style>{`
        /* Container queries: the form reflows by its own width, so it also
           stacks correctly when dropped into a narrow column or preview. */
        .${id}__wrap { max-width: 720px; margin: 0 auto; container-type: inline-size; }
        .${id}__header { margin-bottom: clamp(28px, 5vw, 48px); }
        .${id}__eyebrow {
          color: #E74552;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 0 0 14px;
        }
        .${id}__headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: var(--text-display-sm, clamp(32px, 5vw, 56px));
          line-height: 0.95;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--form-text);
          margin: 0 0 14px;
          text-wrap: balance;
        }
        .${id}__intro {
          font-size: clamp(14px, 1.05vw, 15px);
          line-height: 1.65;
          color: var(--form-muted);
          margin: 0;
          max-width: 620px;
          text-wrap: pretty;
        }

        .${id}__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px 20px;
          border-top: 1px solid var(--form-border);
          padding-top: clamp(24px, 4vw, 36px);
        }
        @container (min-width: 560px) {
          .${id}__grid { grid-template-columns: 1fr 1fr; }
          .${id}__field { grid-column: span 2; }
          .${id}__field.is-half { grid-column: span 1; }
        }

        .${id}__field { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .${id}__label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--form-label);
        }
        .${id}__optional {
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: none;
          opacity: 0.8;
          margin-left: 6px;
        }
        .${id}__control {
          width: 100%;
          min-width: 0;
          height: 48px;
          padding: 0 14px;
          border: 1px solid var(--form-border);
          border-radius: 0;
          background: var(--form-field-bg);
          color: var(--form-text);
          font: inherit;
          font-size: 16px;
          line-height: 1.4;
          transition: border-color 160ms ease, box-shadow 160ms ease;
          -webkit-appearance: none;
          appearance: none;
        }
        @media (min-width: 1024px) { .${id}__control { font-size: 15px; } }
        .${id}__control::placeholder { color: var(--form-muted); opacity: 0.7; }
        .${id}__control:hover { border-color: var(--form-border-hover); }
        .${id}__control:focus-visible {
          outline: none;
          border-color: var(--form-focus);
          box-shadow: 0 0 0 1px var(--form-focus);
        }
        .${id}__control[aria-invalid="true"] { border-color: var(--form-error); }
        textarea.${id}__control {
          height: auto;
          min-height: 148px;
          padding: 12px 14px;
          resize: vertical;
        }
        select.${id}__control {
          padding-right: 40px;
          background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
                            linear-gradient(135deg, currentColor 50%, transparent 50%);
          background-position: calc(100% - 20px) 21px, calc(100% - 15px) 21px;
          background-size: 5px 5px, 5px 5px;
          background-repeat: no-repeat;
        }
        select.${id}__control option { color: #091628; }

        .${id}__check {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          color: var(--form-text);
          font-size: 15px;
          line-height: 1.5;
        }
        .${id}__check input {
          flex: 0 0 auto;
          width: 20px;
          height: 20px;
          margin: 1px 0 0;
          accent-color: var(--form-focus);
        }

        .${id}__help { font-size: 13px; line-height: 1.5; color: var(--form-muted); margin: 0; }
        .${id}__fielderror { font-size: 13px; line-height: 1.4; color: var(--form-error); margin: 0; }

        .${id}__footer {
          grid-column: 1 / -1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px 24px;
          margin-top: 6px;
        }
        .${id}__error { font-size: 14px; color: var(--form-error); margin: 0; }

        .${id}__honeypot {
          position: absolute !important;
          left: -10000px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .${id}__success {
          border-top: 1px solid var(--form-border);
          padding-top: clamp(24px, 4vw, 36px);
          animation: ${id}-fade 320ms cubic-bezier(.2,.8,.2,1) both;
        }
        .${id}__success-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 2.6vw, 28px);
          text-transform: uppercase;
          color: var(--form-text);
          margin: 0 0 8px;
        }
        .${id}__success-text {
          font-size: clamp(14px, 1.05vw, 15px);
          line-height: 1.65;
          color: var(--form-muted);
          margin: 0;
          max-width: 620px;
        }
        @keyframes ${id}-fade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .${id}__success { animation: none; }
          .${id}__control { transition: none; }
        }
      `}</style>

      <div className={`${id}__wrap`}>
        <header className={`${id}__header`}>
          {eyebrow && <p className={`${id}__eyebrow`}>{eyebrow}</p>}
          {headline && <h2 className={`${id}__headline`}>{headline}</h2>}
          {intro && <p className={`${id}__intro`}>{intro}</p>}
        </header>

        {state.success ? (
          <div className={`${id}__success`} role="status">
            <p className={`${id}__success-title`}>{successTitle}</p>
            <p className={`${id}__success-text`}>{successMessage}</p>
          </div>
        ) : (
          <form className={`${id}__grid`} onSubmit={onSubmit} aria-busy={pending}>
            {formKey && <input type="hidden" name="_formKey" value={formKey} />}
            <div className={`${id}__honeypot`} aria-hidden="true">
              <label>
                Leave this field empty
                <input type="text" name={FORM_HONEYPOT_NAME} tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {fields.map((f) => {
              const inputId = `${uid}-${f.name}`
              const err     = state.fieldErrors?.[f.name]
              const descIds = [
                f.helpText ? `${inputId}-help` : null,
                err ? `${inputId}-err` : null,
              ].filter(Boolean).join(" ") || undefined
              const common = {
                id:                 inputId,
                name:               f.name,
                required:           f.required,
                "aria-invalid":     err ? true : undefined,
                "aria-describedby": descIds,
              }
              const half = f.width === "half" && f.type !== "checkbox" && f.type !== "textarea"

              return (
                <div key={f.name} className={`${id}__field${half ? " is-half" : ""}`}>
                  {f.type === "checkbox" ? (
                    <label className={`${id}__check`}>
                      <input type="checkbox" value="Yes" {...common} />
                      <span>
                        {f.label}
                        {!f.required && <span className={`${id}__optional`}>(optional)</span>}
                      </span>
                    </label>
                  ) : (
                    <>
                      <label htmlFor={inputId} className={`${id}__label`}>
                        {f.label}
                        {!f.required && <span className={`${id}__optional`}>(optional)</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea className={`${id}__control`} placeholder={f.placeholder} maxLength={5000} {...common} />
                      ) : f.type === "select" ? (
                        <select className={`${id}__control`} defaultValue="" {...common}>
                          <option value="" disabled>{f.placeholder || "Choose one"}</option>
                          {(f.options ?? []).map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input
                          className={`${id}__control`}
                          type={f.type}
                          placeholder={f.placeholder}
                          maxLength={500}
                          autoComplete={
                            f.type === "email" ? "email" : f.type === "tel" ? "tel" : undefined
                          }
                          {...common}
                        />
                      )}
                    </>
                  )}
                  {f.helpText && <p id={`${inputId}-help`} className={`${id}__help`}>{f.helpText}</p>}
                  {err && <p id={`${inputId}-err`} className={`${id}__fielderror`}>{err}</p>}
                </div>
              )
            })}

            <div className={`${id}__footer`}>
              <ArrowPillButton
                type="submit"
                tone={tone === "light" ? "dark" : "navy"}
                disabled={pending}
              >
                {pending ? "Sending…" : submitLabel}
              </ArrowPillButton>
              {state.error && <p className={`${id}__error`} role="alert">{state.error}</p>}
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
