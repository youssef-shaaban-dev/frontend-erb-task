"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useInvoiceStore } from "../../../store/useInvoiceStore";

export function AutoSaveIndicator() {
  const { isSaving, saveError, lastSavedAt, invoiceData } = useInvoiceStore();
  const [secondsAgo, setSecondsAgo] = useState(0);

  // Update the "seconds ago" counter every 5 seconds
  useEffect(() => {
    if (!lastSavedAt) return;

    const update = () => {
      setSecondsAgo(Math.max(0, Math.floor((Date.now() - lastSavedAt.getTime()) / 1000)));
    };

    update(); // initial
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  if (isSaving) {
    return (
      <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>جاري الحفظ...</span>
      </div>
    );
  }

  if (saveError) {
    return (
      <div className="flex items-center gap-1.5 text-destructive text-sm">
        <XCircle className="w-4 h-4" />
        <span>{typeof saveError === 'string' ? saveError : 'خطأ في الحفظ'}</span>
        {invoiceData.invoiceNumber && (
          <span className="text-muted-foreground mr-2">{invoiceData.invoiceNumber}</span>
        )}
      </div>
    );
  }

  if (lastSavedAt) {
    const timeText = secondsAgo < 60
      ? `منذ ${secondsAgo} ثوان`
      : `منذ ${Math.floor(secondsAgo / 60)} دقيقة`;

    return (
      <div className="flex items-center gap-1.5 text-green-600 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>تم الحفظ {timeText}</span>
        {invoiceData.invoiceNumber && (
          <span className="text-muted-foreground mr-2">{invoiceData.invoiceNumber}</span>
        )}
      </div>
    );
  }

  return null;
}
