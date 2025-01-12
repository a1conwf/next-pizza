"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProductWithRelations } from "@/@types/prisma";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductForm } from "../product-form";

interface Props {
  className?: string;
  product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => router.back()}
      aria-describedby={product.name}
    >
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
