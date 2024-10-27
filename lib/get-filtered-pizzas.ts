import { prisma } from "@/prisma/prisma-client";

export interface SearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaDoughs?: string;
  ingredients?: string;
  priceFrom?: number;
  priceTo?: number;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

export const getFilteredPizzas = async (params: SearchParams) => {
  const sizes = params.sizes?.split(",").map(Number);
  const pizzaTypes = params.pizzaDoughs?.split(",").map(Number);
  const ingredientIdsArr = params.ingredients?.split(",").map(Number);

  const minPrice = params.priceFrom || DEFAULT_MIN_PRICE;
  const maxPrice = params.priceTo || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          ingredients: ingredientIdsArr
            ? {
                some: {
                  id: {
                    in: ingredientIdsArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              size: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              price: {
                gte: Number(minPrice),
                lte: Number(maxPrice),
              },
            },
          },
        },
        include: {
          items: {
            where: {
              price: {
                gte: Number(minPrice),
                lte: Number(maxPrice),
              },
            },
            orderBy: {
              price: "asc",
            },
          },
          ingredients: true,
        },
      },
    },
  });

  return categories;
};
