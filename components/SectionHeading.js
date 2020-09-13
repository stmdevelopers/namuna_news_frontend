export default function SectionHeading({ value, headingStyle }) {
  return (
    <section className={`section-heading ${headingStyle ? headingStyle : ""}`}>
      <h4 className="section-heading-text">{value}</h4>
      <div className="section-border">
        <span className="color-line"></span>
        <span className="color-line"></span>
        <span className="color-line"></span>
      </div>
    </section>
  );
}