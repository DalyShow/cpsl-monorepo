import { FAQAccordion, type FAQAccordionBackground, type FAQAnswer, type FAQItem } from "@cpsl/ui";
import type { PortableTextBlock } from "@portabletext/react";

interface SanityFAQItem {
  _key?:    string;
  question: string;
  /** Portable Text once migrated; string for not-yet-migrated legacy docs. */
  answer:   PortableTextBlock[] | string;
}

interface FAQAccordionBlockProps {
  background?:    FAQAccordionBackground;
  eyebrow?:       string;
  headline?:      string;
  intro?:         string;
  items?:         SanityFAQItem[];
  allowMultiple?: boolean;
}

export function FAQAccordionBlock({
  background    = "cream",
  eyebrow,
  headline,
  intro,
  items,
  allowMultiple = false,
}: FAQAccordionBlockProps) {
  const mapped: FAQItem[] | undefined = items
    ?.filter((i) => {
      if (!i.question) return false;
      if (typeof i.answer === "string") return i.answer.length > 0;
      return Array.isArray(i.answer) && i.answer.length > 0;
    })
    .map((i) => ({ question: i.question, answer: i.answer as FAQAnswer }));

  // Skip rendering if there's no question — Studio default has empty array
  if (!mapped || mapped.length === 0) return null;

  return (
    <FAQAccordion
      background={background}
      eyebrow={eyebrow}
      headline={headline}
      intro={intro}
      items={mapped}
      allowMultiple={allowMultiple}
    />
  );
}
