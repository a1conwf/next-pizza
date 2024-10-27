"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Title } from "./title";
import { Button } from "../ui";
import { IngredientItem, PizzaImage } from ".";
import { ProductVariants } from "./product-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { getPizzaDetails } from "@/lib";
import { usePizzaOptions } from "@/hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onAddToCart: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onAddToCart,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availablePizzasBySize,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(items);

  const { textDetails, totalPrice } = getPizzaDetails(
    size,
    type,
    items,
    ingredients,
    selectedIngredients
  );

  const handleAddToCart = () => {
    if (currentItemId) {
      onAddToCart(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} name={name} />

      <div className="w-[490px] bg-[#f3f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <ProductVariants
            items={availablePizzasBySize}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <ProductVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleAddToCart}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart for {totalPrice} &euro;
        </Button>
      </div>
    </div>
  );
};
