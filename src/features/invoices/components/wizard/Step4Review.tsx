"use client";

import { Step4Summary } from "./step4/Step4Summary";

export function Step4Review() {
  return (
    <div className="space-y-6">
      {/* Header section (if needed, though already handled in WizardHeader) */}
      <div className="mb-6 border-b border-border/50 pb-4">
        <h2 className="text-xl font-bold text-foreground mb-2">المراجعة والاعتماد</h2>
        <p className="text-sm text-muted-foreground">
          يرجى مراجعة كافة التفاصيل قبل تقديم الفاتورة للاعتماد النهائي.
        </p>
      </div>

      <Step4Summary />
    </div>
  );
}
