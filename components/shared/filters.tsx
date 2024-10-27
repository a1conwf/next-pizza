"use client";

import React from "react";
import { useIngredients, useFilters, useQueryFilters } from "@/hooks";

import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  const items = ingredients.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      {/* Pizza doughs */}
      <CheckboxFiltersGroup
        title="Dough"
        name="pizzaDoughs"
        className="mt-5"
        onClickCheckbox={filters.setDoughs}
        selectedValues={filters.doughs}
        items={[
          { text: "Thin", value: "1" },
          { text: "Traditional", value: "2" },
        ]}
      />

      {/* Sizes */}
      <CheckboxFiltersGroup
        title="Sizes"
        name="sizes"
        className="mt-5"
        onClickCheckbox={filters.setSizes}
        selectedValues={filters.sizes}
        items={[
          { text: "Small", value: "20" },
          { text: "Medium", value: "30" },
          { text: "Large", value: "40" },
        ]}
      />

      {/* Price filter */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from/to</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            max={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
            value={filters.prices.priceFrom}
          />
          <Input
            type="number"
            placeholder="100"
            min={100}
            max={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
            value={filters.prices.priceTo}
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={5}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 100]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ingredients"
        name="ingredients"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selectedValues={filters.selectedIngredients}
      />
    </div>
  );
};
