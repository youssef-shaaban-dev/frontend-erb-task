"use client";

import { useEffect } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { areDynamicFieldsRequired } from "../../engine/ruleEngine";
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
  
  // Use the Dynamic Rule Engine instead of hardcoded logic
  const isExceedingLimit = areDynamicFieldsRequired("cost-approval", invoiceData);
  
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
