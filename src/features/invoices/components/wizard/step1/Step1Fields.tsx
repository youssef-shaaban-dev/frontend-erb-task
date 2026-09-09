"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

import { Step1FormValues } from "../../../schemas/step1Schema";
import { INVOICE_TYPES } from "../../../types";

export function Step1Fields() {
  const { control } = useFormContext<Step1FormValues>();
  const watchedValues = useWatch({ control });

  const invoiceDate = watchedValues.invoiceDate;
  const dueDate = watchedValues.dueDate;
  const isOver90Days =
    invoiceDate && dueDate && differenceInDays(dueDate, invoiceDate) > 90;

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        {/* Invoice Number (Right in RTL) */}
        <FormField
          control={control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الفاتورة</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  readOnly
                  className="bg-muted text-right text-muted-foreground"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Customer (Left in RTL) */}
        <FormField
          control={control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                العميل <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العميل..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CUST-001">
                    شركة التقنية المتقدمة ش.م.م
                  </SelectItem>
                  <SelectItem value="CUST-002">
                    مؤسسة الأعمال الحديثة
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Payment Type (Right in RTL) */}
        <FormField
          control={control}
          name="paymentType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>نوع الدفع</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center space-x-2 space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value={INVOICE_TYPES.CASH} />
                    </FormControl>
                    <FormLabel className="font-normal">نقدي (Cash)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-x-reverse">
                    <FormControl>
                      <RadioGroupItem value={INVOICE_TYPES.CREDIT} />
                    </FormControl>
                    <FormLabel className="font-normal">آجل (Credit)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Currency (Left in RTL) */}
        <FormField
          control={control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العملة</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العملة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                  <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Issue Date (Right in RTL) */}
        <FormField
          control={control}
          name="invoiceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>تاريخ الإصدار</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger
                    className={cn(
                      "inline-flex items-center justify-center rounded-lg border border-transparent whitespace-nowrap transition-all outline-none select-none h-10 gap-1.5 px-3",
                      "border-border bg-background hover:bg-muted hover:text-foreground", // outline variant
                      "w-full text-right font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "MM/dd/yyyy")
                    ) : (
                      <span>اختر التاريخ</span>
                    )}
                    <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Due Date (Left in RTL) */}
        <FormField
          control={control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className={cn(isOver90Days && "text-destructive")}>
                تاريخ الاستحقاق
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger
                    className={cn(
                      "inline-flex items-center justify-center rounded-lg border border-transparent whitespace-nowrap transition-all outline-none select-none h-10 gap-1.5 px-3",
                      "border-border bg-background hover:bg-muted hover:text-foreground", // outline variant
                      "w-full text-right font-normal",
                      !field.value && "text-muted-foreground",
                      isOver90Days &&
                        "border-destructive text-destructive bg-destructive/5"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "MM/dd/yyyy")
                    ) : (
                      <span>اختر التاريخ</span>
                    )}
                    <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              {isOver90Days && (
                <p className="text-xs text-destructive flex items-center mt-1">
                  <AlertCircle className="w-3 h-3 ml-1" />
                  تاريخ الاستحقاق يتجاوز الحد الأقصى المسموح به للدفع الآجل (90
                  يوماً).
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Notes */}
      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ملاحظات الفاتورة (تظهر للعميل)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="أدخل أي شروط أو ملاحظات إضافية هنا..."
                className="resize-none min-h-25"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
