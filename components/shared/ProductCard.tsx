import { baseImageUrl } from "@/lib/axios";
import Favourite, { WishlistItemData } from "./Favourite";

interface AddToCartPayload {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
interface ProductCardProps {
  id: string;
  category: string;
  name: string;
  description?: string;
  price: number;
  sellingInfo?: string;
  volume?: string;
  volumeUnit?: string;
  imageUrl: string;
  imageAlt?: string;
  onAddToCart?: (item: AddToCartPayload) => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  category,
  price,
  sellingInfo,
  volume,
  volumeUnit = "pc",
  imageUrl,
  imageAlt = "Product image",
  onAddToCart,
}: ProductCardProps) {
  const productData: WishlistItemData = {
    id,
    name,
    price,
    imageUrl,
  };

  const firstImage = imageUrl?.split?.(",")?.[0] ?? "/placeholder.png";

  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Header with favorite button */}
      <div className="relative px-6 pt-6 pb-2">
        <Favourite productId={id} productData={productData} />
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={`${baseImageUrl}${firstImage}`}
            alt={imageAlt}
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6 py-4">
        {/* id and Item Number */}
        <div className="mb-3 space-y-1">
          <p className="text-sm font-medium text-red-500">Item No {id}</p>
          <p className="text-sm text-gray-600">
            <span className="text-gray-800">{category.toUpperCase()}</span>
          </p>
        </div>

        {/* name */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
          {name}
        </h2>

        {/* description if provided */}
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-2xl font-bold text-blue-600">${price}</span>
        </div>

        {/* Selling Info */}
        {sellingInfo && (
          <p className="text-xs text-gray-500 mb-3">{sellingInfo}</p>
        )}

        {/* Volume */}
        {volume && (
          <p className="text-sm font-semibold text-gray-800 mb-4">
            <span className="text-red-500">{volume}</span> {volumeUnit}
          </p>
        )}

        <button
          onClick={() =>
            onAddToCart?.({
              id,
              name,
              price,
              imageUrl,
            })
          }
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
        >
          <span>Add To Cart</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
