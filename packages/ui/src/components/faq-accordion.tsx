"use client"

import { useState } from "react"

export type FAQAccordionBackground = "white" | "cream" | "surface" | "navy" | "gold"

export interface FAQItem {
  question: string
  answer:   string
}

export interface FAQAccordionProps {
  eyebrow?:    string
  headline?:   string
  intro?:      string
  items?:      FAQItem[]
  background?: FAQAccordionBackground
  /** Allow multiple panels open at once. Default: false (single-open). */
  allowMultiple?: boolean
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    question: "What is the National 1 League?",
    answer:
      "The National 1 League is the top tier of the US Club Soccer National League program — a coast-to-coast competition designed to deliver the most demanding, college-relevant fixture list outside MLS Next and ECNL. CPSL operates the league for the Carolinas territory.",
  },
  {
    question: "How does my club apply for admission?",
    answer:
      "Admission runs through the CPSL application portal. Submit your club's competitive history, coaching credentials, and facility profile via GotSport. The competition committee reviews applications quarterly and notifies clubs within 30 days.",
  },
  {
    question: "When does the 2026-2027 season begin?",
    answer:
      "Fall fixtures open the weekend of September 5, 2026 and run through early November. The spring half resumes mid-March 2027 with regional finals in late May and the National Championship the second week of June.",
  },
  {
    question: "What age groups are eligible?",
    answer:
      "U13 through U19 boys and girls. Each age group plays a 14-game regular-season schedule plus playoffs. U19 receives a condensed fall-only format to align with college recruiting calendars.",
  },
  {
    question: "Are college coaches present at matches?",
    answer:
      "Yes. Every National 1 fixture is published to the NCSA and FieldLevel feeds and CPSL hosts three dedicated college showcases per year. Coaches from D1, D2, D3, and NAIA programs attend; recent showcases drew 180+ schools.",
  },
  {
    question: "What are the player registration requirements?",
    answer:
      "Players must hold a current US Club Soccer pass, a clean concussion-protocol certification, and a verified birth certificate on file with the club. CPSL audits rosters at the start of each half-season.",
  },
]

const outerBgMap: Record<FAQAccordionBackground, string> = {
  white:   "#FFFFFF",
  cream:   "#F4EFE6",
  surface: "#F4F6FA",
  navy:    "#091628",
  gold:    "#C9A74C",
}

type Tone = "dark" | "light"
const toneMap: Record<FAQAccordionBackground, Tone> = {
  white:   "dark",
  cream:   "dark",
  surface: "dark",
  navy:    "light",
  gold:    "dark",
}

const palette: Record<Tone, {
  text:        string
  muted:       string
  border:      string
  accent:      string
  iconBgOpen:  string
  iconFgOpen:  string
  iconBorder:  string
  hover:       string
}> = {
  dark: {
    text:       "#091628",
    muted:      "#5A6577",
    border:     "rgba(9, 22, 40, 0.12)",
    accent:     "#C9A74C",
    iconBgOpen: "#C9A74C",
    iconFgOpen: "#091628",
    iconBorder: "rgba(9, 22, 40, 0.18)",
    hover:      "#091628",
  },
  light: {
    text:       "#F4EFE6",
    muted:      "rgba(244, 239, 230, 0.72)",
    border:     "rgba(244, 239, 230, 0.16)",
    accent:     "#C9A74C",
    iconBgOpen: "#C9A74C",
    iconFgOpen: "#091628",
    iconBorder: "rgba(244, 239, 230, 0.22)",
    hover:      "#C9A74C",
  },
}

export function FAQAccordion({
  eyebrow       = "Frequently Asked",
  headline      = "EVERYTHING YOU NEED TO KNOW",
  intro         = "Common questions about the National 1 League — admissions, season format, eligibility, and what to expect from the CPSL competition year.",
  items         = DEFAULT_ITEMS,
  background    = "cream",
  allowMultiple = false,
}: FAQAccordionProps) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]))

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        if (!allowMultiple) next.clear()
        next.add(i)
      }
      return next
    })
  }

  const tone = toneMap[background]
  const c    = palette[tone]
  const bg   = outerBgMap[background]
  const id   = "cpsl-faq"

  const cssVars = {
    "--faq-text":         c.text,
    "--faq-muted":        c.muted,
    "--faq-border":       c.border,
    "--faq-accent":       c.accent,
    "--faq-icon-bg-open": c.iconBgOpen,
    "--faq-icon-fg-open": c.iconFgOpen,
    "--faq-icon-border":  c.iconBorder,
    "--faq-hover":        c.hover,
    background:           bg,
    padding:              "clamp(28px, 4vw, 48px) clamp(20px, 5vw, 30px) clamp(56px, 8vw, 88px)",
  } as React.CSSProperties

  return (
    <section style={cssVars}>
      <style>{`
        .${id}__wrap {
          max-width: 980px;
          margin: 0 auto;
        }
        .${id}__header { margin-bottom: clamp(32px, 6vw, 56px); }
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
          color: var(--faq-text);
          margin: 0 0 14px;
          text-wrap: balance;
        }
        .${id}__intro {
          font-size: clamp(14px, 1.05vw, 15px);
          line-height: 1.65;
          color: var(--faq-muted);
          margin: 0;
          max-width: 620px;
          text-wrap: pretty;
        }

        .${id}__list { border-top: 1px solid var(--faq-border); }
        .${id}__item { border-bottom: 1px solid var(--faq-border); }

        .${id}__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(16px, 3vw, 32px);
          padding: clamp(20px, 3vw, 26px) 4px;
          background: transparent;
          border: 0;
          cursor: pointer;
          text-align: left;
          color: var(--faq-text);
          transition: color 200ms ease;
        }
        .${id}__trigger:hover { color: var(--faq-hover); }
        .${id}__trigger:focus-visible {
          outline: 2px solid var(--faq-accent);
          outline-offset: 4px;
          border-radius: 2px;
        }

        .${id}__question {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: clamp(17px, 2.2vw, 24px);
          letter-spacing: 0;
          text-transform: uppercase;
          line-height: 1.15;
        }

        .${id}__icon {
          flex: 0 0 auto;
          width: clamp(28px, 3.4vw, 36px);
          height: clamp(28px, 3.4vw, 36px);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--faq-icon-border);
          border-radius: 999px;
          color: var(--faq-text);
          transition:
            transform 320ms cubic-bezier(.2,.8,.2,1),
            border-color 200ms ease,
            background 200ms ease,
            color 200ms ease;
        }
        .${id}__item.is-open .${id}__icon {
          background: var(--faq-icon-bg-open);
          border-color: var(--faq-icon-bg-open);
          color: var(--faq-icon-fg-open);
          transform: rotate(45deg);
        }

        .${id}__panel { overflow: hidden; }
        .${id}__panel[hidden] { display: none; }
        .${id}__answer {
          font-size: clamp(14px, 1.05vw, 15px);
          line-height: 1.65;
          color: var(--faq-muted);
          padding: 0 clamp(0px, 6vw, 60px) clamp(20px, 3.5vw, 30px) 4px;
          max-width: 760px;
          text-wrap: pretty;
          animation: ${id}-fade 320ms cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes ${id}-fade {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        @media (prefers-reduced-motion: reduce) {
          .${id}__icon, .${id}__answer {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
        @media (max-width: 480px) {
          .${id}__trigger { padding-left: 0; padding-right: 0; }
          .${id}__answer  { padding-left: 0; padding-right: 0; }
        }
      `}</style>

      <div className={`${id}__wrap`}>
        <header className={`${id}__header`}>
          <p className={`${id}__eyebrow`}>{eyebrow}</p>
          <h2 className={`${id}__headline`}>{headline}</h2>
          {intro && <p className={`${id}__intro`}>{intro}</p>}
        </header>

        <div className={`${id}__list`}>
          {items.map((item, i) => {
            const isOpen   = open.has(i)
            const panelId  = `${id}-panel-${i}`
            const buttonId = `${id}-trigger-${i}`
            return (
              <div key={i} className={`${id}__item ${isOpen ? "is-open" : ""}`}>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className={`${id}__trigger`}
                >
                  <span className={`${id}__question`}>{item.question}</span>
                  <span className={`${id}__icon`} aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M3.5 9H14.5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`${id}__panel`}
                >
                  <div className={`${id}__answer`}>{item.answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
