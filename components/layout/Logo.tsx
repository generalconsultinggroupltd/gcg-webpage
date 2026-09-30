import Image from "next/image";
import Link from "next/link";

/** The logo, linking home. `href` and `label` come from the caller, which
 * knows the page's language (the header and footer). */
export function Logo({
  size = "md",
  priority = false,
  href,
  label,
}: {
  size?: "sm" | "md";
  priority?: boolean;
  href: string;
  label: string;
}) {
  const box = size === "md" ? "h-27 w-27" : "h-14 w-14";
  return (
    <Link
      href={href}
      className="flex items-center gap-3"
      aria-label={label}
    >
      <Image
        src="/logo-removebg-preview.png"
        alt=""
        width={120}
        height={120}
        priority={priority}
        className={`${box} shrink-0 object-contain`}
      />
      <span className="font-sans text-[13px] font-bold uppercase leading-[1.15] tracking-[0.14em] text-white">
        General
        <br />
        Consulting
        <br />
        Group
      </span>
    </Link>
  );
}
