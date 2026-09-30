import type { SVGProps } from "react";
import type { ServiceIcon } from "@/lib/services";

type IconProps = SVGProps<SVGSVGElement>;

// Directional icons (arrows, chevrons) add `rtl:-scale-x-100` so they point
// the reading direction on Arabic pages.

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M14.5 18.5c.4-2.3 2-3.7 4-3.7 1.2 0 2 .4 2.5 1" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8.5 6 6l4 1.5L6.5 11a1.4 1.4 0 0 0 2 2l2.2-2.1L15 14l-1 1.5 2 1.5-1.5 1.5-2-1.5-1.5 1.5-2-1.5L5 12.5 2.5 8.5ZM14 7.5l4-1.5 3.5 2.5-2.5 4L17 14" />
    </svg>
  );
}

export function ShipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17c1.5 1 3 1 4.5 0s3 1 4.5 0 3 1 4.5 0 3 1 4.5 0M4 14 3 10l9-3 9 3-1 4M7 9V6h4V4h2v2h4v3" />
    </svg>
  );
}

export function StarPersonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17.5 3.5l.7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1.1 1.5-.2Z" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-8 5-13 14-13-1 9-5 13-12 13H5Z" />
      <path d="M5 19c3-4 6-7 10-9" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z" />
    </svg>
  );
}

export function AfricaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 3.5 11.5 3l3 1.5 3.5-.5 1 3-1.5 2.5.5 3.5-2 3-.5 4-2 1.5-2-1.5-1-3.5-2.5-2-1-3.5L5 8l1.5-3 1.5-1.5Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props} className={`rtl:-scale-x-100 ${props.className ?? ""}`}>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props} className={`rtl:-scale-x-100 ${props.className ?? ""}`}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props} className={`rtl:-scale-x-100 ${props.className ?? ""}`}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="m5 12 4 4L19 7" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M14 4h6v6M20 4l-9 9M18 13v6H5V6h6" />
    </svg>
  );
}

/* Admin dashboard */

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4" />
    </svg>
  );
}

export function TrendUpIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.8} {...props}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowDownRightIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M7 7l10 10M17 8v9H8" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function DevicesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="14" height="10" rx="1.5" />
      <path d="M6 18h7M9.5 14v4" />
      <rect x="16" y="9" width="5.5" height="11" rx="1.2" />
    </svg>
  );
}

export function PagesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </svg>
  );
}

export function SignalIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20V14M9.3 20V10M14.6 20V6M20 20V3" />
    </svg>
  );
}

export function TableIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9h18M3 14.5h18M9 9v11" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/* Social */

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.5 8.5H3.6V20h2.9V8.5ZM5 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20.4 13c0-3-1.6-4.7-4.1-4.7-1.6 0-2.6.8-3.1 1.6V8.5h-2.9V20h2.9v-6c0-1.6.6-2.6 2-2.6 1.3 0 1.8.9 1.8 2.6v6h2.9l.5-7Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.5 3h3l-6.8 7.8L21.7 21h-5.9l-4.6-6-5.3 6h-3l7.3-8.3L2.6 3h6l4.2 5.5L17.5 3Zm-1 16.2h1.7L7.6 4.7H5.8l10.7 14.5Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4A21 21 0 0 0 14.3 4c-2.3 0-3.9 1.4-3.9 4v2.5H7.8v3h2.6V21h3.1Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  );
}

export const socialIcons = {
  LinkedIn: LinkedInIcon,
  X: XIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
} as const;

export const serviceIcons: Record<ServiceIcon, (props: IconProps) => React.JSX.Element> = {
  consulting: UsersIcon,
  trade: GlobeIcon,
  representation: HandshakeIcon,
  hostesses: StarPersonIcon,
  code: CodeIcon,
  leaf: LeafIcon,
  stay: HomeIcon,
};
