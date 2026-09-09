"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      name: "",
      quantity: 1,
      price: 0,
      discount: 0,
      taxPercent: 15,
      availableStock: 0,
    });
  };

  return (
    <>
      <div className="border rounded-md">
        <ScrollArea className="h-100 w-full">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-30">رقم الصنف</TableHead>
                <TableHead className="w-50">اسم الصنف</TableHead>
                <TableHead className="w-20">الكمية</TableHead>
                <TableHead className="w-30">سعر الوحدة</TableHead>
                <TableHead className="w-20">الخصم</TableHead>
                <TableHead className="w-20">الضريبة %</TableHead>
                <TableHead className="w-30">الإجمالي</TableHead>
                <TableHead className="w-15"></TableHead>
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
        </ScrollArea>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-2 text-primary border-primary hover:bg-primary/5"
        onClick={handleAddItem}
      >
        <Plus className="w-4 h-4 ml-2" />
        إضافة بند جديد
      </Button>
    </>
  );
}
