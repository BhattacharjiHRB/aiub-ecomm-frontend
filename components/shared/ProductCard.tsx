import Favourite, { WishlistItemData } from "./Favourite";

interface ProductCardProps {
  id: string;
  itemNumber: string;
  title: string;
  description?: string;
  price: number;
  sellingInfo?: string;
  volume?: string;
  volumeUnit?: string;
  imageUrl: string;
  imageAlt?: string;
  onAddToCart?: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export default function ProductCard({
  id,
  itemNumber,
  title,
  description,
  price,
  sellingInfo,
  volume,
  volumeUnit = "oz",
  imageUrl,
  imageAlt = "Product image",
  onAddToCart,
}: ProductCardProps) {
  const productData: WishlistItemData = {
    id,
    title,
    price,
    imageUrl,
  };
  return (
    <div className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Header with favorite button */}
      <div className="relative px-6 pt-6 pb-2">
        <Favourite productId={id} productData={productData} />
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-6 py-4">
        {/* id and Item Number */}
        <div className="mb-3 space-y-1">
          <p className="text-sm font-medium text-red-500">id {id}</p>
          <p className="text-sm text-gray-600">
            Item No <span className="text-gray-800">{itemNumber}</span>
          </p>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
          {title}
        </h2>

        {/* description if provided */}
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}

        {/* Price Section */}
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-2xl font-bold text-blue-600">
            ${price.toFixed(2)}
          </span>
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

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
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
