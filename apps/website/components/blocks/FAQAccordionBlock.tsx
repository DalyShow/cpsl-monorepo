import { FAQAccordion, type FAQAccordionBackground, type FAQItem } from "@cpsl/ui";

interface SanityFAQItem {
  _key?:    string;
  question: string;
  answer:   string;
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
    ?.filter((i) => i.question && i.answer)
    .map((i) => ({ question: i.question, answer: i.answer }));

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
