import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineDark";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-navy-950 hover:bg-gold-400 focus-visible:outline-gold-400",
  outline:
    "border border-gold-500 text-gold-300 hover:bg-gold-500/10 focus-visible:outline-gold-400",
  outlineDark:
    "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:outline-navy-900",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  external?: boolean;
};

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  external,
}: ButtonLinkProps) {
  const classes = `${baseClass} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
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

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClass} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
