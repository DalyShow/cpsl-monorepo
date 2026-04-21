"use client";
import { set, unset } from "sanity";
import type { StringInputProps } from "sanity";

/**
 * Native hex color picker for Sanity string fields.
 * Stores the value as a plain "#RRGGBB" string — always hex, no format tabs.
 */
export function ColorHexInput(props: StringInputProps) {
  const { value = "", onChange, readOnly } = props;

  const colorValue = /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000";

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v ? set(v) : unset());
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    if (!raw) { onChange(unset()); return; }
    // Always store with leading # so CSS recognises it as a hex colour
    const v = raw.startsWith("#") ? raw : `#${raw}`;
    onChange(set(v));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Native browser colour picker — always returns #RRGGBB */}
      <input
        type="color"
        value={colorValue}
        onChange={handleColor}
        disabled={readOnly}
        style={{
          width: 44, height: 36,
          padding: "2px 4px",
          border: "1px solid var(--card-border-color, #ccc)",
          borderRadius: 3,
          background: "none",
          cursor: readOnly ? "not-allowed" : "pointer",
          flexShrink: 0,
        }}
      />
      {/* Editable hex text field */}
      <input
        type="text"
        value={value}
        onChange={handleText}
        placeholder="#000000"
        readOnly={readOnly}
        spellCheck={false}
        style={{
          flex: 1,
          padding: "6px 10px",
          border: "1px solid var(--card-border-color, #ccc)",
          borderRadius: 3,
          fontFamily: "monospace",
          fontSize: 14,
          background: "var(--card-bg-color, #fff)",
          color: "var(--card-fg-color, #111)",
        }}
      />
      {/* Live colour preview dot */}
      {value && (
        <div
          style={{
            width: 24, height: 24,
            borderRadius: "50%",
            background: value,
            border: "1px solid var(--card-border-color, #ccc)",
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}
