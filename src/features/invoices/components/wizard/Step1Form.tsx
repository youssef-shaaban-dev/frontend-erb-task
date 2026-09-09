"use client";

import { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import { step1Schema, Step1FormValues } from "../../schemas/step1Schema";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { INVOICE_TYPES, InvoiceType } from "../../types";

import { Step1Fields } from "./step1/Step1Fields";

function FormSync() {
  const { updateInvoiceData } = useInvoiceStore();
  const watchedValues = useWatch();

  useEffect(() => {
    updateInvoiceData({
      invoiceNumber: watchedValues.invoiceNumber,
      customerId: watchedValues.customerId,
      type: watchedValues.paymentType as InvoiceType,
      invoiceDate: watchedValues.invoiceDate
        ? new Date(watchedValues.invoiceDate).toISOString()
        : undefined,
      dueDate: watchedValues.dueDate
        ? new Date(watchedValues.dueDate).toISOString()
        : undefined,
      currency: watchedValues.currency,
      notes: watchedValues.notes || undefined,
    });
  }, [watchedValues, updateInvoiceData]);

  return null;
}

export function Step1Form() {
  const { invoiceData } = useInvoiceStore();

  const form = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      invoiceNumber: invoiceData.invoiceNumber || "INV-2024-00142",
      customerId: invoiceData.customerId || "",
      currency: invoiceData.currency || "SAR",
      paymentType:
        invoiceData.type === INVOICE_TYPES.CREDIT
          ? INVOICE_TYPES.CREDIT
          : INVOICE_TYPES.CASH,
      invoiceDate: invoiceData.invoiceDate
        ? new Date(invoiceData.invoiceDate)
        : new Date(),
      dueDate: invoiceData.dueDate ? new Date(invoiceData.dueDate) : new Date(),
      notes: invoiceData.notes || "",
    },
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-lg font-bold text-foreground">معلومات الفاتورة</h2>
      </div>

      <FormProvider {...form}>
        <Form {...form}>
          <form
            id="step1-form"
            className="space-y-6"
            onSubmit={form.handleSubmit(() => {
              useInvoiceStore.getState().nextStep();
            })}
          >
            <FormSync />
            <Step1Fields />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
