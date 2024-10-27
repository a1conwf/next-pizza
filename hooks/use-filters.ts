import React from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface PriceRangeProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
  pizzaDoughs: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  doughs: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceRangeProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRangeProps, value: number) => void;
  setDoughs: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [doughs, { toggle: toggleDoughs }] = useSet(
    new Set<string>(
      searchParams.has("pizzaDoughs")
        ? searchParams.get("pizzaDoughs")?.split(",")
        : []
    )
  );

  const [prices, setPrices] = React.useState<PriceRangeProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const handleUpdatePrice = (name: keyof PriceRangeProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
      selectedIngredients,
      sizes,
      doughs,
      prices,
      setPrices: handleUpdatePrice,
      setDoughs: toggleDoughs,
      setSizes: toggleSizes,
      setIngredients: toggleIngredients,
    }),
    [sizes, doughs, prices, selectedIngredients]
  );
};
