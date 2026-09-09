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
            ? "bg-blue-50 text-blue-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <Icon className={cn("w-5 h-5", isActive ? "text-blue-700" : "text-gray-400")} />
        {label}
      </Link>
    </li>
  );
}
