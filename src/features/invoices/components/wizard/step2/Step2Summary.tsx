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
      const taxableAmount = Math.max(0, subtotal - d);
      const tax = taxableAmount * (t / 100);
      const total = taxableAmount + tax;

      return {
        subtotal: acc.subtotal + subtotal,
        discount: acc.discount + d,
        tax: acc.tax + tax,
        final: acc.final + total,
      };
    },
    { subtotal: 0, discount: 0, tax: 0, final: 0 }
  );

  return (
    <div className="mt-8 flex justify-end">
      <div className="w-87.5 bg-muted/30 p-6 rounded-lg border border-border space-y-4">
        <h3 className="font-bold text-lg mb-4">ملخص الفاتورة</h3>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">الإجمالي قبل الضريبة</span>
          <span className="font-medium">
            {totals.subtotal.toLocaleString("ar-SA", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">إجمالي الخصم</span>
          <span className="font-medium text-destructive">
            {totals.discount.toLocaleString("ar-SA", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">إجمالي الضريبة (15%)</span>
          <span className="font-medium">
            {totals.tax.toLocaleString("ar-SA", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-4 border-t border-border/50">
          <span>الإجمالي النهائي</span>
          <span className="text-primary">
            {totals.final.toLocaleString("ar-SA", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
