import React from "react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

import * as CartItem from "./cart-item-details";
import { cn } from "@/lib/utils";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickDelete?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  details,
  name,
  price,
  quantity,
  onClickCountButton,
  onClickDelete,
  disabled,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6",
        { "opacity-50 pointer-events-none": disabled },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex flex-col gap-4 flex-1">
        <CartItem.Info name={name} details={details} />

        <hr />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
