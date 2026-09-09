import { useEffect, useRef } from "react";
import { useInvoiceStore } from "../store/useInvoiceStore";
import { invoiceApi, ApiError } from "../api/client";

export function useAutoSave() {
  const { invoiceData, setSavingStatus, updateInvoiceData } = useInvoiceStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDataRef = useRef(invoiceData);

  useEffect(() => {
    if (prevDataRef.current === invoiceData) return;
    prevDataRef.current = invoiceData;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      setSavingStatus(true);
      try {
        const result = await invoiceApi.saveDraft(invoiceData);
        // If it's a new draft, it gets an ID from the backend
        if (!invoiceData.id && result.id) {
          updateInvoiceData({ id: result.id });
        }
        setSavingStatus(false);
      } catch (error) {
        if (error instanceof ApiError && error.status === 409) {
          // Handle 409 conflict
          setSavingStatus(false, "يوجد تعارض: تم تعديل هذه الفاتورة من مكان آخر.");
        } else {
          setSavingStatus(false, "حدث خطأ أثناء الحفظ التلقائي.");
        }
      }
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [invoiceData, setSavingStatus, updateInvoiceData]);
}
