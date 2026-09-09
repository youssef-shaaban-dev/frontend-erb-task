"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, ScanBarcode, Box } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Step2FormValues } from "../../../schemas/step2Schema";
import { Step2ItemRow } from "./Step2ItemRow";

export function Step2ItemsTable() {
  const { control } = useFormContext<Step2FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleAddItem = () => {
    append({
      id: crypto.randomUUID(),
      itemId: "",
      sku: "",
      name: "",
      quantity: 1,
      price: 0,
      discount: 0,
      taxPercent: 15,
      availableStock: 0,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header section matching the screenshot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="w-6 h-6 text-foreground" />
          <h2 className="text-xl font-bold text-foreground">إدارة البنود والمخزون</h2>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            className="text-primary gap-2 font-medium h-10 px-4"
          >
            <ScanBarcode className="w-5 h-5" />
            مسح باركود
          </Button>
          <Button
            type="button"
            className="bg-[#004b93] hover:bg-[#004b93]/90 text-white gap-2 h-10 px-4"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" />
            إضافة سطر جديد
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-b border-border">
                <TableHead className="w-12 min-w-[48px] text-center"></TableHead>
                <TableHead className="text-right whitespace-nowrap min-w-[250px]">المنتج / الخدمة</TableHead>
                <TableHead className="text-center whitespace-nowrap min-w-[150px]">رمز التخزين (SKU)</TableHead>
                <TableHead className="text-center whitespace-nowrap min-w-[140px]">الكمية</TableHead>
                <TableHead className="text-center whitespace-nowrap min-w-[180px]">سعر الوحدة</TableHead>
                <TableHead className="text-center whitespace-nowrap min-w-[120px]">الخصم (%)</TableHead>
                <TableHead className="text-center whitespace-nowrap min-w-[120px]">الضريبة (15%)</TableHead>
                <TableHead className="text-center whitespace-nowrap min-w-[160px]">الإجمالي</TableHead>
                <TableHead className="w-12 min-w-[48px] text-center">إجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <Step2ItemRow
                  key={field.id}
                  index={index}
                  fieldId={field.id}
                  onRemove={() => remove(index)}
                  canRemove={fields.length > 1}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
