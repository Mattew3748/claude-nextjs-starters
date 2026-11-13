"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEMOS } from "@/lib/demos";
import { cn } from "@/lib/utils";

export function DemoNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto md:w-48 md:shrink-0 md:flex-col">
      {DEMOS.map((d) => {
        const active = pathname === d.href || pathname.startsWith(`${d.href}/`);
        return (
          <Link
            key={d.slug}
            href={d.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-muted",
              active && "bg-muted font-medium",
            )}
          >
            {d.name}
          </Link>
        );
      })}
    </nav>
  );
}
