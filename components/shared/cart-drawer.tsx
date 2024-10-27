"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { items, updateItemQuantity, deleteCartItem, totalAmount } = useCart();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div
          className={cn(
            "flex flex-col h-full",
            items.length === 0 && "justify-center"
          )}
        >
          {items.length > 0 && (
            <SheetHeader>
              <SheetTitle>
                <span className="font-bold">{items.length} items</span> in the
                cart
              </SheetTitle>
            </SheetHeader>
          )}

          {items.length == 0 && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="empty-box"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Cart is empty"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Add at least one product to place an order
              </p>
              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Continue shopping
                </Button>
              </SheetClose>
            </div>
          )}

          {items.length > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex flex-col gap-3 flex-1">
                {items.map((item) => (
                  <CartDrawerItem
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

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Total
                    </span>

                    <span className="font-bold text-lg">
                      {totalAmount} &euro;
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button type="submit" className="w-full h-12 text-base">
                      Place order
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
