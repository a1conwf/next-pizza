import { useCartStore } from "@/store";
import React from "react";

export const useCart = () => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
