"use client";

import { useEffect, useState } from "react";

export interface WishlistItemData {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

interface FavouriteProps {
  productId: string;
  productData?: WishlistItemData;
  onFavoriteChange?: (isFavorited: boolean, item?: WishlistItemData) => void;
}

function Favourite({
  productId,
  productData,
  onFavoriteChange,
}: FavouriteProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const wishlist = localStorage.getItem("wishlist");
    const items = wishlist ? JSON.parse(wishlist) : [];
    const isFav = items.some((item: WishlistItemData) => item.id === productId);
    setIsFavorited(isFav);
    setIsLoaded(true);
  }, [productId]);

  // Listen for storage changes from other tabs/components
  useEffect(() => {
    const handleStorageChange = () => {
      const wishlist = localStorage.getItem("wishlist");
      const items = wishlist ? JSON.parse(wishlist) : [];
      const isFav = items.some(
        (item: WishlistItemData) => item.id === productId,
      );
      setIsFavorited(isFav);
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener("wishlistUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlistUpdated", handleStorageChange);
    };
  }, [productId]);

  const handleFavorite = () => {
    const wishlist = localStorage.getItem("wishlist");
    const items: WishlistItemData[] = wishlist ? JSON.parse(wishlist) : [];

    if (isFavorited) {
      // Remove from wishlist
      const filtered = items.filter((item) => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(filtered));
      setIsFavorited(false);
      onFavoriteChange?.(false);
    } else {
      // Add to wishlist
      if (productData) {
        const newItems = [...items, productData];
        localStorage.setItem("wishlist", JSON.stringify(newItems));
        setIsFavorited(true);
        onFavoriteChange?.(true, productData);
      }
    }

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (!isLoaded) {
    return (
      <button
        disabled
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        aria-label="Loading favorites"
      >
        <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
      </button>
    );
  }

  return (
    <button
      onClick={handleFavorite}
      className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
      aria-label="Add to favorites"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isFavorited ? "#E63946" : "none"}
        stroke={isFavorited ? "#E63946" : "#E63946"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export default Favourite;
