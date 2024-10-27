import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "./../constants/pizza";

export const calcPizzaTotalPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  size: PizzaSize,
  type: PizzaType
) => {
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
