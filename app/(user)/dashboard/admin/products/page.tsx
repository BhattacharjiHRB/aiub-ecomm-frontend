"use client";

import { axiosFetch } from "@/lib/axios";
import { Trash2 } from "lucide-react";
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

const categoryStyle: Record<string, string> = {
  sneakers: "bg-orange-50 text-orange-700",
  electronics: "bg-blue-50 text-blue-700",
  electorinics: "bg-blue-50 text-blue-700", // API typo fallback
  laptops: "bg-violet-50 text-violet-700",
  footwear: "bg-amber-50 text-amber-700",
  smartphones: "bg-sky-50 text-sky-700",
};

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosFetch.get("products");
        setProducts(res.data.data ?? []);
        setTotal(res.data.count ?? 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      await axiosFetch.delete(`products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setTotal((prev) => prev - 1);
      toast.success("Product deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-800">Products</p>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-6 text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No products found.
        </p>
      ) : (
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "ID",
                "Image",
                "Name",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Added",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="pb-2 text-xs font-medium text-gray-400 text-left"
                  style={{
                    width:
                      i === 0
                        ? "5%"
                        : i === 1
                          ? "7%"
                          : i === 8
                            ? "5%"
                            : i === 3
                              ? "11%"
                              : i === 4
                                ? "8%"
                                : i === 5
                                  ? "7%"
                                  : i === 6
                                    ? "8%"
                                    : i === 7
                                      ? "9%"
                                      : "auto",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => {
              const firstImage = p.imageUrl?.[0];
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-gray-400">#{p.id}</td>
                  <td className="py-3">
                    {firstImage ? (
                      <img
                        src={firstImage}
                        alt={p.name}
                        className="w-8 h-8 rounded-lg object-cover border border-gray-100"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-300 text-xs">
                        —
                      </div>
                    )}
                  </td>
                  <td className="py-3 text-gray-800 font-medium truncate">
                    {p.name}
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${categoryStyle[p.category] ?? "bg-gray-100 text-gray-500"}`}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3 text-gray-800 font-medium">
                    ${parseFloat(p.price).toFixed(2)}
                  </td>
                  <td className="py-3 text-gray-500">{p.stock}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-100 text-red-700"}`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deleting === p.id}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                      aria-label="Delete product"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
