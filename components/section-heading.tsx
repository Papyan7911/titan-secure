export function SectionHeading({ eyebrow, title, children, light = false, centered = false }: { eyebrow: string; title: string; children?: React.ReactNode; light?: boolean; centered?: boolean }) {
  return <div className={`section-heading${light ? " light" : ""}${centered ? " centered" : ""}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
