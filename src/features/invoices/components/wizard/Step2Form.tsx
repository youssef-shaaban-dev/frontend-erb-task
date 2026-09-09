"use client";

import { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import { step2Schema, Step2FormValues } from "../../schemas/step2Schema";
import { useInvoiceStore } from "../../store/useInvoiceStore";

import { Step2ItemsTable } from "./step2/Step2ItemsTable";
import { Step2Summary } from "./step2/Step2Summary";

function FormSync() {
  const { updateInvoiceData } = useInvoiceStore();
  const watchedItems = useWatch({ name: "items" });

  useEffect(() => {
    updateInvoiceData({
      items: watchedItems,
    });
  }, [watchedItems, updateInvoiceData]);

  return null;
}

export function Step2Form() {
  const { invoiceData } = useInvoiceStore();

  const form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      items: invoiceData.items?.length
        ? invoiceData.items
        : [
            {
              id: crypto.randomUUID(),
              itemId: "",
              name: "",
              quantity: 1,
              price: 0,
              discount: 0,
              taxPercent: 15,
              availableStock: 0,
            },
          ],
    },
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-lg font-bold text-foreground">بنود الفاتورة</h2>
      </div>

      <FormProvider {...form}>
        <Form {...form}>
          <form className="space-y-4">
            <FormSync />
            <Step2ItemsTable />
            <Step2Summary />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
