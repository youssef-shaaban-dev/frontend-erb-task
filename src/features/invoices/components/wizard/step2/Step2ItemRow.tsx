"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Trash2, AlertCircle, Laptop, Printer, Server, Minus, Plus } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  // Calculate row total: Price * Quantity - (Discount as percentage of subtotal)
  // Wait, in screenshot, is discount % or fixed?
  // Let's assume % based on header "الخصم (%)"
  const subtotal = q * p;
  const discountAmount = subtotal * (d / 100);
  const rowTax = Math.max(0, subtotal - discountAmount) * (t / 100);
  const rowTotal = Math.max(0, subtotal - discountAmount) + rowTax;

  const availableStock = currentItem?.availableStock || 0;
  const isOverStock = currentItem?.itemId && q > availableStock;

  const getProductIcon = (sku?: string) => {
    if (sku?.includes("LPT")) return <Laptop className="w-5 h-5 text-muted-foreground" />;
    if (sku?.includes("PRN")) return <Printer className="w-5 h-5 text-muted-foreground" />;
    return <Server className="w-5 h-5 text-muted-foreground" />;
  };

  const handleIncrement = () => {
    setValue(`items.${index}.quantity`, q + 1, { shouldValidate: true, shouldDirty: true });
  };

  const handleDecrement = () => {
    if (q > 1) {
      setValue(`items.${index}.quantity`, q - 1, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <TableRow key={fieldId} className="group h-[72px]">
      {/* Index */}
      <TableCell className="text-center font-medium text-muted-foreground w-12">
        {index + 1}
      </TableCell>

      {/* Product / Service */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.itemId`}
          render={({ field: formField }) => (
            <FormItem className="w-full">
              <Select
                onValueChange={(val) => {
                  const product = mockInventory.find((p) => p.id === val);
                  if (product) {
                    formField.onChange(product.id);
                    setValue(`items.${index}.sku`, product.sku);
                    setValue(`items.${index}.name`, product.name);
                    setValue(`items.${index}.price`, product.price);
                    setValue(`items.${index}.taxPercent`, product.taxPercent);
                    setValue(`items.${index}.availableStock`, product.availableStock);
                  }
                }}
                value={formField.value}
              >
                <FormControl>
                  <SelectTrigger className="h-14 border-0 hover:bg-muted/50 p-2 px-0 bg-transparent shadow-none focus:ring-0">
                    <div className="flex items-center gap-3 text-right">
                      <div className="w-10 h-10 rounded-md border border-border flex items-center justify-center bg-muted/20 shrink-0">
                        {getProductIcon(currentItem?.sku)}
                      </div>
                      <div className="flex flex-col gap-1 items-start">
                        <SelectValue placeholder="اختر المنتج..." />
                        {currentItem?.itemId && (
                          <span className={`text-[11px] font-medium ${availableStock <= 5 ? 'text-destructive' : 'text-emerald-600'}`}>
                            {availableStock <= 5 ? `متوفر ${availableStock} وحدات فقط` : `متوفر ${availableStock} وحدة`}
                          </span>
                        )}
                      </div>
                    </div>
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

      {/* SKU */}
      <TableCell className="text-center text-muted-foreground font-medium text-sm">
        {currentItem?.sku || "-"}
      </TableCell>

      {/* Quantity with +/- */}
      <TableCell>
        <FormField
          control={control}
          name={`items.${index}.quantity`}
          render={({ field: formField }) => (
            <FormItem>
              <TooltipProvider delay={0}>
                <Tooltip open={!!isOverStock}>
                  <TooltipTrigger>
                    <FormControl>
                      <div className={`flex items-center border rounded-md h-10 overflow-hidden ${isOverStock ? 'border-destructive ring-1 ring-destructive' : 'border-border'}`}>
                        <button
                          type="button"
                          onClick={handleIncrement}
                          className="w-10 h-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <Input
                          type="number"
                          min={1}
                          className="h-full border-0 rounded-none text-center focus-visible:ring-0 w-full px-0"
                          {...formField}
                          onChange={(e) => formField.onChange(Number(e.target.value))}
                        />
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className="w-10 h-full flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors border-r border-border"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    </FormControl>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-destructive/10 text-destructive border-destructive/20 font-medium px-3 py-1.5 flex items-center gap-1.5 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    رسالة تحذير: الكمية المطلوبة تتجاوز المخزون المتاح
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                <div className="flex h-10 w-full items-center border border-border rounded-md overflow-hidden bg-background focus-within:ring-1 focus-within:ring-ring">
                  <Input
                    type="number"
                    min={0}
                    className="flex-1 h-full border-0 rounded-none text-center focus-visible:ring-0 px-2"
                    {...formField}
                    onChange={(e) => formField.onChange(Number(e.target.value))}
                  />
                  <div className="h-full px-3 flex items-center justify-center bg-muted/50 border-r border-border text-xs font-medium text-muted-foreground whitespace-nowrap">
                    ر.س
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Discount % */}
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
                  max={100}
                  className="h-10 text-center"
                  {...formField}
                  onChange={(e) => formField.onChange(Number(e.target.value))}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>

      {/* Tax */}
      <TableCell className="text-center font-medium text-muted-foreground">
        {rowTax.toLocaleString("ar-SA", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>

      {/* Row Total */}
      <TableCell className="text-center font-bold text-foreground">
        {rowTotal.toLocaleString("ar-SA", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onRemove}
          disabled={!canRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
