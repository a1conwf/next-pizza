import React from "react";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "@/lib";
import { Variant } from "@/components/shared/product-variants";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availablePizzasBySize: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availablePizzasBySize = getAvailablePizzaSizes(type, items);

  const currentItemId = items.find(
    (item) => item.size === size && item.pizzaType === type
  )?.id;

  React.useEffect(() => {
    const isAvailableSize = availablePizzasBySize?.find(
      (item) => Number(item.value) === Number(size) && !item.disabled
    );

    const availableSize = availablePizzasBySize?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availablePizzasBySize,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
