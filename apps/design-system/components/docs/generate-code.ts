import type { Control, ControlsState } from "./types"

const isQuoteable = (s: string) => /[\s'"]/.test(s) || s.length > 60

function formatPropValue(v: string | boolean): string | null {
  if (typeof v === "boolean") return v ? "" : null
  return JSON.stringify(v)
}

/** Generate a JSX snippet for the component, omitting props that match their default. */
export function generateJSX(
  componentName: string,
  controls:      Control[],
  values:        ControlsState,
  trailingChildren?: string,
): string {
  const lines: string[] = [`<${componentName}`]

  for (const c of controls) {
    const v = values[c.prop]
    if (v === c.default) continue

    if (typeof v === "boolean") {
      // boolean true → bare flag; boolean false (when default true) → ={false}
      if (v) lines.push(`  ${c.prop}`)
      else   lines.push(`  ${c.prop}={false}`)
      continue
    }

    if (typeof v === "string") {
      if (v === "") continue
      lines.push(`  ${c.prop}=${isQuoteable(v) ? "{" + JSON.stringify(v) + "}" : '"' + v + '"'}`)
    }
  }

  if (trailingChildren) {
    lines.push(`>`)
    lines.push(`  ${trailingChildren}`)
    lines.push(`</${componentName}>`)
  } else {
    lines.push(`/>`)
  }

  return lines.join("\n")
}
