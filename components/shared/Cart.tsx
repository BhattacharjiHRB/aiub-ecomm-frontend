"use client";

import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";

import { baseImageUrl } from "@/lib/axios";
import { useCart } from "@/lib/contexts/CartContext";

interface CartProps {
  userId: number;
}

export default function Cart({ userId }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { cartItems, removeFromCart, confirmOrder } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="w-6 h-6" />

        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Empty Cart */}
            {cartItems.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b pb-4">
                      <img
                        src={`${baseImageUrl}${item.imageUrl[0]}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-sm font-bold text-blue-600 mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total</span>

                    <span className="text-xl font-bold text-blue-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => confirmOrder(userId)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
