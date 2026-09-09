import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  BarChart2,
  HelpCircle,
  Building2
} from "lucide-react";
import { APP_ROUTES } from "@/config/routes";
import { SidebarItem } from "./SidebarItem";

const menuItems = [
  { href: APP_ROUTES.DASHBOARD, label: "لوحة التحكم", icon: LayoutDashboard },
  { href: APP_ROUTES.INVOICES, label: "الفواتير", icon: FileText, isActive: true }, // Set active for now
  { href: APP_ROUTES.INVENTORY, label: "المخزون", icon: Package },
  { href: APP_ROUTES.CUSTOMERS, label: "العملاء", icon: Users },
  { href: APP_ROUTES.REPORTS, label: "التقارير", icon: BarChart2 },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-l border-gray-200 flex flex-col h-full shrink-0">
      {/* Logo / Header Area */}
      <div className="h-20 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-3 text-primary">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">إدارة الموارد</h1>
            <p className="text-xs text-gray-500">المؤسسة العربية</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={item.isActive}
            />
          ))}
        </ul>
      </nav>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-1">
          <SidebarItem
            href={APP_ROUTES.HELP}
            label="المساعدة"
            icon={HelpCircle}
          />
        </ul>
      </div>
    </aside>
  );
}
