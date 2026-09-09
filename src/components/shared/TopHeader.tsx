"use client";

import { Search, Bell, Settings, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInvoiceStore } from "@/features/invoices/store/useInvoiceStore";

export function TopHeader() {
  const { isSaving, lastSavedAt, saveError } = useInvoiceStore();

  return (
    <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Right Side: Title & Search (RTL) */}
      <div className="flex items-center gap-8 flex-1">
        <h1 className="text-xl font-bold text-primary">نظام الفواتير</h1>
        
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input 
            type="search" 
            placeholder="بحث..." 
            className="w-full pr-10 bg-gray-50 border-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-white"
          />
        </div>
      </div>

      {/* Left Side: Status & Profile (RTL) */}
      <div className="flex items-center gap-6">
        
        {/* Save Status */}
        <div className="flex items-center text-sm font-medium">
          {isSaving && (
            <span className="text-muted-foreground flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              جاري الحفظ...
            </span>
          )}
          
          {!isSaving && lastSavedAt && !saveError && (
            <span className="text-green-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              تم الحفظ بنجاح
            </span>
          )}

          {saveError && (
            <span className="text-destructive flex items-center gap-2">
              خطأ في الحفظ
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border"></div>

        {/* Icons */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* User Avatar */}
        <Avatar className="h-9 w-9 border border-border">
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
