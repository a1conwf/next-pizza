import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const productId = Number(id);

  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) return notFound();

  return <ChooseProductModal product={product} />;
}
