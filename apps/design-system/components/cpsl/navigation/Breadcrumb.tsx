export interface BreadcrumbProps {
  items?: string[];
}

export function Breadcrumb({
  items = ["CPSL", "Teams", "Charlotte FC", "Matches"],
}: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-sm flex-wrap">
      {items.map((item, i, arr) => {
        const isLast = i === arr.length - 1;
        return (
          <span key={item} className="flex items-center gap-2">
            <a
              className={isLast ? "" : "cursor-pointer hover:underline"}
              style={{
                color: isLast ? "#091628" : "#C9A74C",
                fontWeight: isLast ? 600 : 400,
                textDecoration: "none",
              }}
            >
              {item}
            </a>
            {!isLast && (
              <span style={{ color: "#CBD5E1" }}>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M1 1L5 5L1 9" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
