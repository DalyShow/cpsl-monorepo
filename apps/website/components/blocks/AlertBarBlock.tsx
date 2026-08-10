import { AlertBar, type AlertBarTone } from "@cpsl/ui";

interface AlertBarBlockProps {
  tone?:          AlertBarTone;
  label?:         string;
  text?:          string;
  linkLabel?:     string;
  linkHref?:      string;
  linkNewWindow?: boolean;
}

export function AlertBarBlock({
  tone,
  label,
  text,
  linkLabel,
  linkHref,
  linkNewWindow,
}: AlertBarBlockProps) {
  if (!text) return null;
  return (
    <AlertBar
      tone={tone}
      label={label}
      text={text}
      linkLabel={linkLabel}
      linkHref={linkHref}
      linkNewWindow={linkNewWindow}
    />
  );
}
