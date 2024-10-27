import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  type?: PizzaType,
  size?: PizzaSize,
  ingredients?: CartStateItem["ingredients"]
) => {
  const details = [];

  if (size && type) {
    const typeName = mapPizzaType[type];
    details.push(`${typeName} ${size} cm`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
