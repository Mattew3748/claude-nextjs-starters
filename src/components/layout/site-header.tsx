import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV = [
  { href: "/demo/nextjs", label: "데모" },
  { href: "/todos", label: "할 일" },
  { href: "/dashboard", label: "대시보드" },
];

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">
            Starter Kit
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
