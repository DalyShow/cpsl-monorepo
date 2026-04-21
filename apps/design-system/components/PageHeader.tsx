export default function PageHeader({
  section,
  title,
  description,
}: {
  section: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b px-12 pt-12 pb-8" style={{ borderColor: "#E2E8F0", background: "white" }}>
      <div className="flex items-center gap-3 mb-4">
        <div style={{ width: "4px", height: "40px", background: "#697279", borderRadius: "2px", flexShrink: 0 }} />
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#697279" }}>{section}</div>
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "#091628", letterSpacing: "-0.5px" }}>{title}</h1>
        </div>
      </div>
      <p className="text-base max-w-2xl leading-relaxed pl-4 border-l-2" style={{ color: "#475569", borderColor: "#E2E8F0" }}>
        {description}
      </p>
    </div>
  );
}
