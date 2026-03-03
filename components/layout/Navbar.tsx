"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MapPin } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/journey", label: "Journey", icon: MapPin },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-zinc-100 font-semibold text-lg tracking-tight hover:text-white transition-colors"
        >
          Drew Katz
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-zinc-700/50"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
