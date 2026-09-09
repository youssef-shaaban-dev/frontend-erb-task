import { useEffect, useRef } from "react";
import { useInvoiceStore } from "../store/useInvoiceStore";

export function useAutoSave() {
  const { invoiceData, setSavingStatus } = useInvoiceStore();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDataRef = useRef(invoiceData);

  useEffect(() => {
    if (prevDataRef.current === invoiceData) return;
    prevDataRef.current = invoiceData;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSavingStatus(true);
      setTimeout(() => {
        setSavingStatus(false);
      }, 800);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [invoiceData, setSavingStatus]);
}
