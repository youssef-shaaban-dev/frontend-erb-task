"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { createStep3Schema, Step3FormValues } from "../../schemas/step3Schema";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { Step3Fields } from "./step3/Step3Fields";
import { FileUploadZone } from "./step3/FileUploadZone";

function FormSync() {
  const { updateInvoiceData } = useInvoiceStore();
  const watchedValues = useWatch();

  useEffect(() => {
    updateInvoiceData({
      costCenterId: watchedValues.costCenterId,
      departmentId: watchedValues.departmentId,
      managerId: watchedValues.managerId,
      approvalReason: watchedValues.approvalReason,
      attachments: watchedValues.attachments || [],
    });
  }, [watchedValues, updateInvoiceData]);

  return null;
}

export function Step3Form() {
  const { invoiceData } = useInvoiceStore();
  
  // Calculate total amount from items to determine if limit is exceeded
  const items = invoiceData.items || [];
  const totalAmount = items.reduce((sum, item) => {
    const itemTotal = item.quantity * item.price;
    const afterDiscount = itemTotal - (itemTotal * (item.discount / 100));
    const finalTotal = afterDiscount + (afterDiscount * (item.taxPercent / 100));
    return sum + finalTotal;
  }, 0);

  // In this demo, if total > 10,000, we show the dynamic routing fields
  const isExceedingLimit = totalAmount > 10000;
  
  const schema = createStep3Schema(isExceedingLimit);

  const form = useForm<Step3FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      costCenterId: invoiceData.costCenterId || "",
      departmentId: invoiceData.departmentId || "",
      managerId: invoiceData.managerId || "",
      approvalReason: invoiceData.approvalReason || "",
      attachments: invoiceData.attachments || [],
    },
    mode: "onChange",
  });

  return (
    <div className="space-y-6">
      <FormProvider {...form}>
        <Form {...form}>
          <form
            id="step3-form"
            className="space-y-6"
            onSubmit={form.handleSubmit(() => {
              useInvoiceStore.getState().nextStep();
            })}
          >
            <FormSync />
            
            <Step3Fields isExceedingLimit={isExceedingLimit} />

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">المرفقات الداعمة (اختياري)</FormLabel>
                  <FileUploadZone 
                    files={field.value || []} 
                    onChange={field.onChange} 
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </form>
        </Form>
      </FormProvider>
    </div>
  );
}
