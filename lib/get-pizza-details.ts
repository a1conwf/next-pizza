import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { calcPizzaTotalPrice } from "./calc-pizza-total-price";
import { Ingredient, ProductItem } from "@prisma/client";

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const textDetails = `${size} cm, ${mapPizzaType[type]} dough ${size}`;

  const totalPrice = calcPizzaTotalPrice(
    items,
    ingredients,
    selectedIngredients,
    size,
    type
  );

  return { textDetails, totalPrice };
};
