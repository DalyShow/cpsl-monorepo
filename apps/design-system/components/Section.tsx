export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <div style={{ width: "3px", height: "18px", background: "#697279", borderRadius: "2px" }} />
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#091628" }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
