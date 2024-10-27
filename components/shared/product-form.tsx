"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const firstItem = product.items[0];
  const isPizza = Boolean(firstItem.pizzaType);

  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const handleAddProductToCart = async (
    productItemId?: number,
    ingredients?: number[]
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`${product.name} successfully added to the cart`);
      _onSubmit?.();
    } catch (error) {
      toast.error("Failed to add product to the cart");
      console.error(error);
    }
  };

  if (isPizza) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onAddToCart={handleAddProductToCart}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onAddToCart={handleAddProductToCart}
      loading={loading}
    />
  );
};
