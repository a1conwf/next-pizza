import React from "react";
import { WhiteBlock } from "../white-block";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { CheckoutItem } from "../checkout-item";
import { CartStateItem } from "@/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  deleteCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  deleteCartItem,
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="1. Cart">
      <div className="flex flex-col gap-6">
        {loading
          ? [...Array(3)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                details={getCartItemDetails(
                  item.pizzaType as PizzaType,
                  item.pizzaSize as PizzaSize,
                  item.ingredients
                )}
                disabled={item.disabled}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickDelete={() => deleteCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
