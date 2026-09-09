"use client";

import { useInvoiceStore } from "../../../store/useInvoiceStore";
import { Info, Building2, ListOrdered } from "lucide-react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { MOCK_COST_CENTERS, MOCK_DEPARTMENTS, MOCK_MANAGERS } from "../../../data/mockApprovals";
import { Badge } from "@/components/ui/badge";
import { InvoiceItem } from "../../../types";

export function Step4Summary() {
  const { invoiceData } = useInvoiceStore();
  const {
    invoiceNumber,
    customerId, // In a real app, map this to customer name
    invoiceDate,
    dueDate,
    type,
    costCenterId,
    departmentId,
    managerId,
  } = invoiceData;

  const items: InvoiceItem[] = invoiceData.items || [];

  // Format Dates safely
  const formattedInvoiceDate = invoiceDate
    ? format(new Date(invoiceDate), "dd MMMM yyyy", { locale: arSA })
    : "غير محدد";

  // Calculate Days for Payment Terms
  let paymentTerms = "نقدي";
  if (type === "Credit" && invoiceDate && dueDate) {
    const diffTime = Math.abs(new Date(dueDate).getTime() - new Date(invoiceDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    paymentTerms = `صافي ${diffDays} يوماً`;
  }

  // Cost Approvals Maps
  const costCenter = MOCK_COST_CENTERS.find((c) => c.id === costCenterId)?.name || "غير محدد";
  const department = MOCK_DEPARTMENTS.find((d) => d.id === departmentId)?.name || "غير محدد";
  const manager = MOCK_MANAGERS.find((m) => m.id === managerId)?.name || "غير محدد";

  // Calculations
  const subtotal = items.reduce((sum: number, item: InvoiceItem) => sum + item.quantity * item.price, 0);
  const totalDiscount = items.reduce((sum: number, item: InvoiceItem) => {
    const itemTotal = item.quantity * item.price;
    return sum + (itemTotal * (item.discount / 100));
  }, 0);
  const subtotalAfterDiscount = subtotal - totalDiscount;
  const totalTax = items.reduce((sum: number, item: InvoiceItem) => {
    const itemTotal = item.quantity * item.price;
    const afterDiscount = itemTotal - (itemTotal * (item.discount / 100));
    return sum + (afterDiscount * (item.taxPercent / 100));
  }, 0);
  const finalTotal = subtotalAfterDiscount + totalTax;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* RIGHT COLUMN (col-span-1 in RTL) */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Basic Info Card */}
        <div className="border border-border rounded-xl p-5 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">المعلومات الأساسية</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">رقم المرجع</span>
              <span className="font-medium">{invoiceNumber || "غير محدد"}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">تاريخ الإصدار</span>
              <span className="font-medium">{formattedInvoiceDate}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">العميل</span>
              <span className="font-medium">{customerId || "غير محدد"}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">شروط الدفع</span>
              <span className="font-medium">{paymentTerms}</span>
            </div>
          </div>
        </div>

        {/* Cost Routing Card */}
        <div className="border border-border rounded-xl p-5 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">توجيه التكلفة</h3>
          </div>
          
          <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground text-xs">مركز التكلفة</span>
              <span className="font-medium text-xs">{costCenter}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground text-xs">القسم الإداري</span>
              <span className="font-medium text-xs">{department}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground text-xs">المدير المسؤول</span>
              <span className="font-medium text-xs">{manager}</span>
            </div>
          </div>
        </div>

      </div>

      {/* LEFT COLUMN (col-span-2 in RTL) */}
      <div className="lg:col-span-2 space-y-6">
        
        <div className="border border-border rounded-xl bg-card overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-border">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-foreground">ملخص العناصر</h3>
            </div>
            <Badge variant="secondary" className="bg-muted text-muted-foreground rounded-full px-3">
              {items.length} عناصر
            </Badge>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead className="bg-muted/30 text-muted-foreground text-xs font-medium">
                <tr>
                  <th className="px-5 py-3 w-12 text-center">#</th>
                  <th className="px-5 py-3">الوصف</th>
                  <th className="px-5 py-3 text-center">الكمية</th>
                  <th className="px-5 py-3 text-center">سعر الوحدة</th>
                  <th className="px-5 py-3 text-left">الإجمالي (ر.س)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {items.length > 0 ? (
                  items.map((item: InvoiceItem, index: number) => {
                    const itemTotal = item.quantity * item.price;
                    const afterDiscount = itemTotal - (itemTotal * (item.discount / 100));
                    const finalItemTotal = afterDiscount + (afterDiscount * (item.taxPercent / 100));

                    return (
                      <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-5 py-4 text-center text-muted-foreground">{index + 1}</td>
                        <td className="px-5 py-4 font-medium">{item.name || "عنصر غير مسمى"}</td>
                        <td className="px-5 py-4 text-center">{item.quantity}</td>
                        <td className="px-5 py-4 text-center">{formatCurrency(item.price)}</td>
                        <td className="px-5 py-4 text-left font-semibold">
                          {formatCurrency(finalItemTotal)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      لا توجد عناصر في هذه الفاتورة.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Box */}
          <div className="p-6 bg-background flex justify-end">
            <div className="w-full sm:w-80 border border-border rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">المجموع الفرعي</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-destructive font-medium">الخصم</span>
                <span className="text-destructive font-medium">- {formatCurrency(totalDiscount)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">ضريبة القيمة المضافة</span>
                <span className="font-medium">{formatCurrency(totalTax)}</span>
              </div>
              
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="text-base font-bold text-primary">الإجمالي النهائي</span>
                <div className="text-left">
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(finalTotal)}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">ر.س</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
