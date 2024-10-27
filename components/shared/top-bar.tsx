import React from "react";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";

import { Container } from "./container";
import { Categories } from "./categories";
import { CartButton } from "./cart-button";
import { SearchInput } from "./search-input";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories categories={categories} />
        <div className="mx-10 flex-1">
          <SearchInput />
        </div>
        <CartButton />
      </Container>
    </div>
  );
};
