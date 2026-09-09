"use client";

import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Step3FormValues } from "../../../schemas/step3Schema";
import { MOCK_COST_CENTERS, MOCK_DEPARTMENTS, MOCK_MANAGERS } from "../../../data/mockApprovals";

interface Step3FieldsProps {
  isExceedingLimit: boolean;
}

export function Step3Fields({ isExceedingLimit }: Step3FieldsProps) {
  const { control } = useFormContext<Step3FormValues>();

  return (
    <div className="space-y-8">
      {/* Dynamic Routing Alert */}
      {isExceedingLimit && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">توجيه التكلفة الديناميكي</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              تظهر الحقول أدناه بناءً على نوع الفاتورة والقيمة الإجمالية. نظراً لتجاوز قيمة الفاتورة الحد المسموح، يتطلب الأمر تحديد مركز تكلفة وقسم لغرض الاعتماد الإداري.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="border border-border rounded-xl p-6 bg-card">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-1">تفاصيل التكلفة والاعتماد</h3>
          <p className="text-sm text-muted-foreground">
            يرجى استكمال البيانات المطلوبة لتوجيه المعاملة إلى سلسلة الاعتمادات الصحيحة.
          </p>
        </div>

        <div className="space-y-6">
          {/* Conditional Fields */}
          {isExceedingLimit && (
            <>
              <div className="grid grid-cols-2 gap-6">
                {/* Cost Center (Right in RTL) */}
                <FormField
                  control={control}
                  name="costCenterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        مركز التكلفة <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full text-right h-10">
                            <SelectValue placeholder="اختر مركز التكلفة..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_COST_CENTERS.map((cc) => (
                            <SelectItem key={cc.id} value={cc.id}>
                              {cc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department (Left in RTL) */}
                <FormField
                  control={control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        القسم الإداري <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full text-right h-10">
                            <SelectValue placeholder="اختر القسم الإداري..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_DEPARTMENTS.map((dep) => (
                            <SelectItem key={dep.id} value={dep.id}>
                              {dep.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Manager */}
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name="managerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        المدير المسؤول <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full text-right h-10">
                            <SelectValue placeholder="اختر المدير المسؤول..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_MANAGERS.map((mgr) => (
                            <SelectItem key={mgr.id} value={mgr.id}>
                              {mgr.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div></div> {/* Empty column to keep Manager field at 50% width on the right */}
              </div>
            </>
          )}

          {/* Reason / Notes */}
          <FormField
            control={control}
            name="approvalReason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>سبب / ملاحظات الاعتماد</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="أدخل مبرر المصروف هنا..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
