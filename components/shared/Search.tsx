"use client";

import { axiosFetch } from "@/lib/axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // 🔥 debounce search
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchResults();
    }, 400);

    return () => clearTimeout(delay);
  }, [keyword]);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const res = await axiosFetch.get(`/products/search?keyword=${keyword}`);

      setResults(res.data.data || []);
      setOpen(true);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-8">
      {/* INPUT */}
      <div className="relative">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500"
        />

        <Search className="w-5 h-5 text-blue-900 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* DROPDOWN */}
      {open && keyword && (
        <div className="absolute z-50 w-full mt-2 bg-white shadow-lg rounded-lg border max-h-80 overflow-y-auto">
          {loading ? (
            <p className="p-3 text-sm text-gray-500">Searching...</p>
          ) : results.length === 0 ? (
            <p className="p-3 text-sm text-gray-500">No results found</p>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setKeyword(item.name);
                  setOpen(false);
                }}
              >
                <img
                  src={`http://localhost:4000${item.imageUrl[0]}`}
                  className="w-10 h-10 object-cover rounded"
                />

                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
