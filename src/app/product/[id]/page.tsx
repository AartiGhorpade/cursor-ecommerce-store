import { notFound } from "next/navigation";

import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductById } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  const product = getProductById(productId);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}

