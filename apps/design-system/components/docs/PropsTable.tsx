import type { PropDoc } from "./types"

interface PropsTableProps {
  props: PropDoc[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "#E2E8F0" }}>
      <div className="px-4 py-2.5 border-b text-[10px] font-bold tracking-widest uppercase" style={{ background: "#F4F6FA", borderColor: "#E2E8F0", color: "#697279" }}>
        Props
      </div>

      <table className="w-full text-sm" style={{ color: "#091628" }}>
        <thead>
          <tr className="text-left text-[10px] font-bold tracking-widest uppercase" style={{ color: "#697279" }}>
            <th className="px-4 py-3 font-bold" style={{ width: "20%" }}>Prop</th>
            <th className="px-4 py-3 font-bold" style={{ width: "28%" }}>Type</th>
            <th className="px-4 py-3 font-bold" style={{ width: "16%" }}>Default</th>
            <th className="px-4 py-3 font-bold">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr key={p.name} className={i > 0 ? "border-t" : ""} style={{ borderColor: "#F1F5F9" }}>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-xs" style={{ color: "#091628" }}>
                  {p.name}
                  {p.required && <span style={{ color: "#E74552" }}>*</span>}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-[11px] px-1.5 py-0.5 rounded" style={{ background: "#F4F6FA", color: "#475569" }}>
                  {p.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                {p.default ? (
                  <code className="font-mono text-[11px]" style={{ color: "#697279" }}>{p.default}</code>
                ) : (
                  <span style={{ color: "#CBD5E1" }}>—</span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-xs leading-relaxed" style={{ color: "#475569" }}>
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
