import Link from "next/link";

type Variant = "solid" | "ghost" | "light";

const BASE =
  "inline-flex min-h-11 items-center justify-center border px-9 py-4.5 text-caption font-light uppercase tracking-label transition-colors duration-300";

const VARIANTS: Record<Variant, string> = {
  solid:
    "border-burgundy bg-burgundy text-rose-soft hover:bg-transparent hover:text-burgundy",
  ghost:
    "border-burgundy bg-transparent text-burgundy hover:bg-burgundy hover:text-rose-soft",
  light:
    "border-rose/70 bg-transparent text-rose hover:bg-rose hover:text-burgundy",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: Props) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
