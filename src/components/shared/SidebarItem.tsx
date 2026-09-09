import Link from "next/link";
import { ElementType } from "react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: ElementType;
  isActive?: boolean;
}

export function SidebarItem({ href, label, icon: Icon, isActive }: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground")} />
        {label}
      </Link>
    </li>
  );
}
