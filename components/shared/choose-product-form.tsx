import React from "react";
import { cn } from "@/lib/utils";

import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onAddToCart?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  loading,
  onAddToCart,
  className,
}) => {
  return (
    <div className={cn("flex flex-1", className)}>
      <div
        className={cn(
          "flex items-center justify-center flex-1 relative w-full",
          className
        )}
      >
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f3f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onAddToCart?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart for {price} &euro;
        </Button>
      </div>
    </div>
  );
};
