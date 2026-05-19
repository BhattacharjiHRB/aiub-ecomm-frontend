"use client";

import { baseImageUrl } from "@/lib/axios";
import { Heart, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishlistProps {
  onRemove?: (id: string) => void;
}

export default function Wishlist({ onRemove }: WishlistProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const wishlist = localStorage.getItem("wishlist");
    const parsedItems = wishlist ? JSON.parse(wishlist) : [];
    setItems(parsedItems);
    setIsLoaded(true);
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "wishlist") {
        const parsedItems = e.newValue ? JSON.parse(e.newValue) : [];
        setItems(parsedItems);
      }
    };

    // Custom event for same-tab updates from Favourite component
    const handleWishlistUpdate = () => {
      const wishlist = localStorage.getItem("wishlist");
      const parsedItems = wishlist ? JSON.parse(wishlist) : [];
      setItems(parsedItems);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const handleRemove = (id: string) => {
    const wishlist = localStorage.getItem("wishlist");
    const parsedItems: WishlistItem[] = wishlist ? JSON.parse(wishlist) : [];
    const filtered = parsedItems.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(filtered));
    setItems(filtered);
    onRemove?.(id);

    // Dispatch event to sync with Favourite components
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!isLoaded) {
    return (
      <button
        disabled
        className="p-2 text-gray-400 transition-colors"
        aria-label="Loading wishlist"
      >
        <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Wishlist Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-red-500 transition-colors"
        aria-label="Wishlist"
      >
        <Heart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              My Wishlist
            </h3>

            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Your wishlist is empty
              </p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <img
                      src={`${baseImageUrl}${item.imageUrl[0]}`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        ${item.price}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
                View Wishlist
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
