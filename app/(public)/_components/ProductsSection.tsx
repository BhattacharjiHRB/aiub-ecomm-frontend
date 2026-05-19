"use client";

import ProductCard from "@/components/shared/ProductCard";
import { useCart } from "@/lib/contexts/CartContext";

export default function ProductSection({ products }: any) {
  const { addToCart } = useCart();

  return (
    <>
      <div className="flex items-center justify-between mb-2 bg-linear-to-r from-[#E64644] from-40% to-[#396EAD] p-6 my-5 rounded-2xl">
        <h2 className="text-2xl md:text-4xl font-bold text-white">
          New Products
        </h2>
      </div>

      <div className="grid grid-cols-6 gap-6 mt-5">
        {products?.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            name={product.name}
            price={product.price}
            volume={product.stock}
            volumeUnit="Pcs"
            imageUrl={product.imageUrl ?? []}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
}
