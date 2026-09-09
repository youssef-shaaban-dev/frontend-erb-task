"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AlertCircle, Trash2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Step2FormValues } from "../../../schemas/step2Schema";
import { mockInventory } from "../../../data/mockInventory";

interface Step2ItemRowProps {
  index: number;
  fieldId: string;
  onRemove: () => void;
  canRemove: boolean;
}

export function Step2ItemRow({
  index,
  fieldId,
  onRemove,
  canRemove,
}: Step2ItemRowProps) {
  const { control, setValue } = useFormContext<Step2FormValues>();

  const currentItem = useWatch({
    control,
    name: `items.${index}`,
  });

  const q = Number(currentItem?.quantity) || 0;
  const p = Number(currentItem?.price) || 0;
  const d = Number(currentItem?.discount) || 0;
  const t = Number(currentItem?.taxPercent) || 0;
  const rowTotal = Math.max(0, q * p - d) * (1 + t / 100);

  const isOverStock =
    currentItem?.itemId && q > (currentItem?.availableStock || 0);

  return (
    <TableRow key={fieldId} className="group">
      {/* Item ID */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.itemId`}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...formField}
                  readOnly
                  className="bg-muted text-muted-foreground h-9"
                  placeholder="-"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Item Name (Select from Mock) */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.itemId`}
          render={({ field: formField }) => (
            <FormItem>
              <Select
                onValueChange={(val) => {
                  const product = mockInventory.find((p) => p.id === val);
                  if (product) {
                    formField.onChange(product.id);
                    setValue(`items.${index}.name`, product.name);
                    setValue(`items.${index}.price`, product.price);
                    setValue(`items.${index}.taxPercent`, product.taxPercent);
                    setValue(
                      `items.${index}.availableStock`,
                      product.availableStock
                    );
                  }
                }}
                value={formField.value}
              >
                <FormControl>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="اختر الصنف..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockInventory.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Quantity */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.quantity`}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  className={`h-9 ${
                    isOverStock
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  {...formField}
                  onChange={(e) => formField.onChange(Number(e.target.value))}
                />
              </FormControl>
              {isOverStock && (
                <div className="absolute mt-1 text-[10px] text-destructive flex items-center whitespace-nowrap">
                  <AlertCircle className="w-3 h-3 ml-1" />
                  الكمية تتجاوز المخزون (المتاح: {currentItem?.availableStock})
                </div>
              )}
            </FormItem>
          )}
        />
      </TableCell>

      {/* Price */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.price`}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  className="h-9"
                  {...formField}
                  onChange={(e) => formField.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Discount */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.discount`}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  className="h-9"
                  {...formField}
                  onChange={(e) => formField.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Tax Percent */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.taxPercent`}
          render={({ field: formField }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  className="h-9 bg-muted"
                  readOnly
                  {...formField}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Row Total */}
      <TableCell>
        <div className="h-9 flex items-center px-3 font-medium">
          {rowTotal.toLocaleString("ar-SA", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-destructive"
          onClick={onRemove}
          disabled={!canRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
