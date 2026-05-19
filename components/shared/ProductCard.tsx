import { baseImageUrl } from "@/lib/axios";
import Favourite, { WishlistItemData } from "./Favourite";

interface AddToCartPayload {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
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
  imageUrl: string[];
  imageAlt?: string;
  onAddToCart?: (item: AddToCartPayload) => void;
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
  const firstImage = imageUrl?.[0] ?? "/placeholder.png";

  const productData: WishlistItemData = {
    id,
    name,
    price,
    imageUrl: firstImage,
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="relative px-6 pt-6 pb-2">
        <Favourite productId={id} productData={productData} />

        <div className="flex justify-center">
          <img
            src={`${baseImageUrl}${firstImage}`}
            alt={imageAlt}
            className="h-32 w-32 object-contain"
          />
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="mb-3 space-y-1">
          <p className="text-sm font-medium text-red-500">Item No {id}</p>

          <p className="text-sm text-gray-600">
            <span className="text-gray-800">{category.toUpperCase()}</span>
          </p>
        </div>

        <h2 className="mb-2 text-lg font-bold leading-snug text-gray-900">
          {name}
        </h2>

        {description && (
          <p className="mb-4 text-sm text-gray-600">{description}</p>
        )}

        <div className="mb-2 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-blue-600">${price}</span>
        </div>

        {sellingInfo && (
          <p className="mb-3 text-xs text-gray-500">{sellingInfo}</p>
        )}

        {volume && (
          <p className="mb-4 text-sm font-semibold text-gray-800">
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
          className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
}
