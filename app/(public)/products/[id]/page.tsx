// app/product/[id]/page.tsx

"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: "1",
    name: "Bread Pit Soft White Milk Bread 300gm",
    upc: "UPC10035109",
    itemNo: "#7563517652676",
    price: 32,
    oldPrice: 45,
    stock: "12.00 oz",
    description:
      "Savor the soft, airy crumb and delicate flavor of Bread Pit Soft White Milk Bread. It's the ideal choice for crafting delicious sandwiches, making golden toast, or enjoying as a simple pleasure.",
    images: [
      
    ],
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="flex gap-5">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-24 w-24 overflow-hidden rounded-xl border bg-white"
                >
                  <Image
                    src={img}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border bg-[#fafafa]">
              <div className="relative h-[420px] w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* Product Name */}
            <h1 className="text-3xl font-bold leading-snug text-[#1f4d8f]">
              {product.name}
            </h1>

            {/* UPC */}
            <div className="mt-4 space-y-1 text-sm text-gray-500">
              <p>{product.upc}</p>
              <p>Item No {product.itemNo}</p>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-red-500">
                ${product.price.toFixed(2)}
              </span>

              <span className="text-lg text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-5 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Extra */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Selling in case:</span>{" "}
                (24/cs)
              </p>

              <p>
                <span className="font-semibold">12.00 oz</span>
              </p>

              <p>Special requests? Let us know!</p>
            </div>

            {/* Quantity + Wishlist */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="mb-3 text-sm font-medium text-gray-700">
                  Quantity:
                </p>

                <div className="flex items-center overflow-hidden rounded-lg border">
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev > 1 ? prev - 1 : 1
                      )
                    }
                    className="px-4 py-2 text-lg"
                  >
                    -
                  </button>

                  <span className="px-5 py-2 text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((prev) => prev + 1)
                    }
                    className="px-4 py-2 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="flex items-center gap-2 text-sm text-gray-500">
                <Heart size={16} />
                Wishlist
              </button>
            </div>

            {/* Add To Cart */}
            <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-4 text-sm font-semibold text-white transition hover:bg-red-600">
              Add To Cart
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}