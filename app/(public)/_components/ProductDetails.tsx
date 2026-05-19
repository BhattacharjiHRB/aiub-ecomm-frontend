"use client";

import { Button } from "@/components/ui/button";
import { axiosFetch, baseImageUrl } from "@/lib/axios";
import { useCart } from "@/lib/contexts/CartContext";
import { ChevronLeft, ChevronRight, Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string[] | null;
  price: string;
  stock: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AddToCartPayload {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
}

const categoryStyle: Record<string, string> = {
  sneakers: "bg-orange-50 text-orange-700",
  electronics: "bg-blue-50 text-blue-700",
  electorinics: "bg-blue-50 text-blue-700",
  laptops: "bg-violet-50 text-violet-700",
  footwear: "bg-amber-50 text-amber-700",
  smartphones: "bg-sky-50 text-sky-700",
};

interface Props {
  id: string;
}

export default function ProductDetailsPage({ id }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosFetch.get(`products/${id}`);
        setProduct(res.data.data);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = async (item: AddToCartPayload) => {
    setAddingToCart(true);
    try {
      await addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const images = product?.imageUrl ?? [];
  const prevImage = () =>
    setActiveImage((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setActiveImage((i) => (i + 1) % images.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center gap-3">
        <p className="text-sm text-gray-400">Product not found.</p>
        <Button
          variant="ghost"
          className="text-sm text-gray-500"
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Product Details
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left — Image viewer */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
            {images.length > 0 ? (
              <div className="relative">
                <img
                  src={`${baseImageUrl}${images[activeImage]}`}
                  alt={product.name}
                  className="w-full h-72 object-contain"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-1.5 text-gray-500 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-1.5 text-gray-500 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            i === activeImage ? "bg-blue-500" : "bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-72 bg-gray-50 flex items-center justify-center text-gray-300 text-sm">
                No image
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage
                      ? "border-blue-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={`${baseImageUrl}${src}`}
                    alt={`thumb-${i}`}
                    className="w-full h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Core info + Add to Cart */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-red-500 mb-1">
                  Item No {product.id}
                </p>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                      categoryStyle[product.category] ??
                      "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.category}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      product.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600 shrink-0">
                ${parseFloat(product.price).toFixed(2)}
              </p>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {product.description ?? (
                <span className="text-gray-300 italic">
                  No description provided.
                </span>
              )}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  −
                </button>
                <span className="px-3 py-2 text-sm font-semibold text-gray-800 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-3 py-2 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  +
                </button>
              </div>

              <button
                onClick={() =>
                  handleAddToCart({
                    id: String(product.id),
                    name: product.name,
                    price: parseFloat(product.price),
                    imageUrl: product.imageUrl ?? [],
                  })
                }
                disabled={addingToCart || product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ShoppingCart size={16} />
                )}
                <span>
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </span>
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Product ID",
                value: `#${product.id}`,
                sub: null,
                subColor: "",
              },
              {
                label: "Stock",
                value: product.stock,
                sub:
                  product.stock === 0
                    ? "Out of stock"
                    : product.stock < 20
                      ? "Low stock"
                      : "In stock",
                subColor:
                  product.stock === 0
                    ? "text-red-500"
                    : product.stock < 20
                      ? "text-amber-500"
                      : "text-emerald-500",
              },
              {
                label: "Price",
                value: `$${parseFloat(product.price).toFixed(2)}`,
                sub: null,
                subColor: "",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-gray-100 rounded-xl p-5"
              >
                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <p className="text-xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                {stat.sub && (
                  <p className={`text-xs mt-0.5 ${stat.subColor}`}>
                    {stat.sub}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Timestamps */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-800 mb-4">Activity</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Date Added</p>
                <p className="text-sm text-gray-700">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(product.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Last Updated</p>
                <p className="text-sm text-gray-700">
                  {new Date(product.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(product.updatedAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
