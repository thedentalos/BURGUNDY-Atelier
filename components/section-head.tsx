export function SectionHead({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="font-display text-display-lg font-light text-burgundy">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-px w-12 bg-burgundy/50" aria-hidden="true" />
    </div>
  );
}
