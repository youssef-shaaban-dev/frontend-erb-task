"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Step2FormValues } from "../../../schemas/step2Schema";

export function Step2Summary() {
  const { control } = useFormContext<Step2FormValues>();
  const watchedItems = useWatch({ control, name: "items" });

  const totals = watchedItems.reduce(
    (acc, item) => {
      const q = Number(item.quantity) || 0;
      const p = Number(item.price) || 0;
      const d = Number(item.discount) || 0;
      const t = Number(item.taxPercent) || 0;

      const subtotal = q * p;
      const discountAmount = subtotal * (d / 100);
      const taxableAmount = Math.max(0, subtotal - discountAmount);
      const tax = taxableAmount * (t / 100);
      const total = taxableAmount + tax;

      return {
        subtotal: acc.subtotal + subtotal,
        discount: acc.discount + discountAmount,
        tax: acc.tax + tax,
        final: acc.final + total,
      };
    },
    { subtotal: 0, discount: 0, tax: 0, final: 0 }
  );

  return (
    <div className="mt-8 flex justify-end">
      <div className="w-[400px] p-2 space-y-5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium">المجموع الفرعي:</span>
          <span className="font-medium text-foreground">
            {totals.subtotal.toLocaleString("ar-SA", {
              minimumFractionDigits: 2,
            })} ر.س
          </span>
        </div>

        <div className="flex justify-between items-center text-sm border-b border-border/50 pb-5 border-dashed">
          <span className="text-muted-foreground font-medium">إجمالي الخصومات:</span>
          <span className="font-medium text-foreground">
            - {totals.discount.toLocaleString("ar-SA", {
              minimumFractionDigits: 2,
            })} ر.س
          </span>
        </div>

        <div className="flex justify-between items-center text-sm pt-2 border-b border-border/50 pb-5 border-dashed">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-medium">ضريبة القيمة المضافة</span>
            <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium text-muted-foreground">15%</span>
          </div>
          <span className="font-medium text-foreground">
            {totals.tax.toLocaleString("ar-SA", { minimumFractionDigits: 2 })} ر.س
          </span>
        </div>

        <div className="flex justify-between items-start pt-2">
          <span className="text-lg font-bold">الإجمالي الكلي:</span>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-[#004b93]">
              {totals.final.toLocaleString("ar-SA", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-muted-foreground mt-1">العملة: الريال السعودي (SAR)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
