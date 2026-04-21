export default function CodeBlock({ code, language = "css" }: { code: string; language?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#1E2D45" }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "#0A1628", borderBottom: "1px solid #1E2D45" }}>
        <span className="text-xs font-mono font-semibold" style={{ color: "#475569" }}>{language}</span>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF1744" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFB300" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#00C853" }} />
        </div>
      </div>
      <pre className="p-5 text-xs overflow-x-auto leading-7" style={{ background: "#091628", color: "#94A3B8", fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
