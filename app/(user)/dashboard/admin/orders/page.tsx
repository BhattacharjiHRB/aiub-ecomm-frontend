"use client";

import { axiosFetch } from "@/lib/axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface OrderProduct {
  id: number;
  name: string;
  imageUrl: string[] | null;
  price: string;
  category: string;
}

interface OrderItem {
  id: number;
  product: OrderProduct;
  quantity: number;
  price: string;
}

interface OrderUser {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Order {
  id: number;
  user: OrderUser;
  items: OrderItem[];
  status: "pending" | "completed" | "cancelled" | "processing";
  totalPrice: string;
  createdAt: string;
}

const statusStyle: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
  processing: "bg-blue-50 text-blue-700",
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosFetch.get("orders");
        const data: Order[] = res.data.data ?? [];
        setOrders(data);
        setTotal(data.length);
      } catch (e) {
        console.error(e);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-800">Orders</p>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-5 h-5 animate-spin text-gray-300" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No orders found.
        </p>
      ) : (
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="border-b border-gray-100">
              {[
                { label: "Order ID", width: "7%" },
                { label: "Customer", width: "16%" },
                { label: "Products", width: "auto" },
                { label: "Items", width: "6%" },
                { label: "Total", width: "10%" },
                { label: "Status", width: "10%" },
                { label: "Date", width: "10%" },
              ].map((h, i) => (
                <th
                  key={i}
                  className="pb-2 text-xs font-medium text-gray-400 text-left"
                  style={{ width: h.width }}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => {
              const itemCount = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );
              const firstImage = order.items[0]?.product?.imageUrl?.[0];
              const productNames = order.items
                .map((i) => i.product.name)
                .filter((v, i, a) => a.indexOf(v) === i) // dedupe
                .join(", ");

              return (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Order ID */}
                  <td className="py-3 text-gray-400">#{order.id}</td>

                  {/* Customer */}
                  <td className="py-3">
                    <p className="text-gray-800 font-medium truncate">
                      {order.user.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {order.user.email}
                    </p>
                  </td>

                  {/* Products */}
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={order.items[0].product.name}
                          className="w-7 h-7 rounded-md object-cover border border-gray-100 shrink-0"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-md bg-gray-100 shrink-0" />
                      )}
                      <span className="text-gray-600 truncate text-xs">
                        {productNames}
                      </span>
                    </div>
                  </td>

                  {/* Item count */}
                  <td className="py-3 text-gray-500">{itemCount}</td>

                  {/* Total */}
                  <td className="py-3 text-gray-800 font-medium">
                    ${parseFloat(order.totalPrice).toFixed(2)}
                  </td>

                  {/* Status */}
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                        statusStyle[order.status] ?? "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-3 text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
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
