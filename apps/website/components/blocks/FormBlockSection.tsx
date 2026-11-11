import { FormBlock, type FormBlockBackground, type FormField, type FormFieldType } from "@cpsl/ui";
import { submitForm } from "@/app/actions/submitForm";

interface SanityFormField {
  _key:         string;
  label?:       string;
  type?:        FormFieldType;
  required?:    boolean;
  placeholder?: string;
  options?:     string[];
  width?:       "full" | "half";
  helpText?:    string;
}

interface FormBlockSectionProps {
  _key:            string;
  /** Parent document id, added in the page GROQ projection. */
  _docId?:         string;
  background?:     FormBlockBackground;
  eyebrow?:        string;
  headline?:       string;
  intro?:          string;
  submitLabel?:    string;
  successTitle?:   string;
  successMessage?: string;
  fields?:         SanityFormField[];
}

/**
 * Page-builder wrapper for `formBlock`. Recipients and subject stay on the
 * server (the action re-reads them from Sanity) — only display props are
 * passed to the client component.
 */
export function FormBlockSection({
  _key,
  _docId,
  background = "cream",
  eyebrow,
  headline,
  intro,
  submitLabel,
  successTitle,
  successMessage,
  fields,
}: FormBlockSectionProps) {
  const mapped: FormField[] = (fields ?? [])
    .filter((f) => f.label && f.type)
    .map((f) => ({
      name:        f._key,
      label:       f.label!,
      type:        f.type!,
      required:    !!f.required,
      placeholder: f.placeholder,
      options:     f.options?.filter(Boolean),
      width:       f.width,
      helpText:    f.helpText,
    }));

  if (mapped.length === 0 || !_docId) return null;

  return (
    <FormBlock
      background={background}
      eyebrow={eyebrow ?? ""}
      headline={headline ?? ""}
      intro={intro ?? ""}
      submitLabel={submitLabel || undefined}
      successTitle={successTitle || undefined}
      successMessage={successMessage || undefined}
      fields={mapped}
      formKey={`${_docId}:${_key}`}
      action={submitForm}
    />
  );
}
