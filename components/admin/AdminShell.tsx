"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, type ComponentType, type ReactNode, type SVGProps } from "react";
import { getToken, signOut, subscribeToSession } from "@/lib/adminAuth";
import { SignInForm } from "./SignInForm";
import {
  DashboardIcon,
  HandshakeIcon,
  ImagesIcon,
  LogoutIcon,
  MenuIcon,
  CloseIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { site } from "@/lib/site";

type NavItem = { href: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

// The sections of the previous admin (Dashboard, Status, Partners, My
// account); "Status" is called Gallery on the new site.
const nav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/gallery", label: "Gallery", icon: ImagesIcon },
  { href: "/admin/partners", label: "Partners", icon: HandshakeIcon },
  { href: "/admin/account", label: "My account", icon: UserIcon },
];

/** Every signed-in admin page: the sign-in form until there is a session,
 * then a sidebar (a drawer on small screens) around the page. */
export function AdminShell({ children }: { children: ReactNode }) {
  // undefined until the browser has read the stored session.
  const token = useSyncExternalStore<string | null | undefined>(
    subscribeToSession,
    getToken,
    () => undefined,
  );
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (token === undefined) return null;
  if (!token) return <SignInForm />;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <Link href="/" className="mb-6 flex items-center gap-3 px-2 pt-1">
        <Image src="/logo-removebg-preview.png" alt="" width={40} height={40} className="h-10 w-10" />
        <span className="text-sm leading-tight font-semibold text-white">
          {site.name}
          <span className="block text-xs font-normal text-white/50">Admin panel</span>
        </span>
      </Link>
      {nav.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setMenuOpen(false)}
          aria-current={isActive(href) ? "page" : undefined}
          className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive(href)
              ? "bg-white/10 text-gold-300"
              : "text-white/75 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </Link>
      ))}
      <button
        type="button"
        onClick={signOut}
        className="mt-auto flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-gold-300"
      >
        <LogoutIcon className="h-5 w-5 shrink-0" />
        Sign out
      </button>
    </nav>
  );

  return (
    <div className="flex min-h-full flex-1">
      {/* Sidebar: fixed column from lg up. */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-navy-950 lg:block">{sidebar}</aside>

      {/* Drawer below lg. */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setMenuOpen(false)} />
          <aside className="absolute inset-y-0 start-0 w-64 bg-navy-950">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 end-3 rounded-md p-1 text-white/70 hover:text-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between bg-navy-950 px-5 py-3 text-white lg:hidden">
          <span className="text-sm font-semibold">
            {site.shortName} <span className="text-white/50">· Admin</span>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="rounded-md p-1.5 text-white/80 hover:text-white"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
