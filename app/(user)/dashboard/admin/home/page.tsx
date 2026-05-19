"use client";

import { Button } from "@/components/ui/button";
import { axiosFetch } from "@/lib/axios";
import { ClipboardList, Package, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const quickLinks = [
  {
    href: "/admin/products",
    icon: <Package size={16} />,
    label: "Manage products",
  },
  {
    href: "/admin/orders",
    icon: <ClipboardList size={16} />,
    label: "View orders",
  },
  { href: "/admin/users", icon: <Users size={16} />, label: "Manage users" },
];

interface Order {
  id: number;
  status: string;
  createdAt: string;
  totalPrice?: number;
  user?: { name: string };
}

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  category: string;
}

const statusStyle: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-600",
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oRes, pRes, uRes] = await Promise.all([
          axiosFetch.get("orders"),
          axiosFetch.get("products"),
          axiosFetch.get("users/all"),
        ]);
        setOrders(oRes.data.data ?? []);
        setProducts(pRes.data.data ?? []);
        setUsers(uRes.data.data.users ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = orders.reduce((s, o) => s + +(o.totalPrice ?? 0), 0);

  const stats = [
    { label: "Revenue", value: `$${totalRevenue.toLocaleString()}` },
    { label: "Orders", value: orders.length },
    { label: "Products", value: products.length },
    { label: "Users", value: users.length },
  ];
  console.log(users);
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium text-gray-900">Good morning,</p>
          <p className="text-sm text-gray-400 mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/create">
            <Button
              size="sm"
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg gap-1.5 text-xs"
            >
              <Plus size={14} /> Add product
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg gap-1.5 text-xs border-gray-200"
            >
              <ClipboardList size={14} /> Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-gray-100 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1.5">{s.label}</p>
            <p className="text-2xl font-medium text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Quick links */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4"></p>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-800 mb-4">Quick links</p>
          <div className="space-y-2">
            {quickLinks.map((l) => (
              <Link key={l.label} href={l.href}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <span className="text-gray-400">{l.icon}</span>
                  <span className="text-sm text-gray-700">{l.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-gray-800">Recent orders</p>
          <Link
            href="/admin/orders"
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 py-6 text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            No orders yet.
          </p>
        ) : (
          <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="border-b border-gray-100">
                {["Order", "Customer", "Status", "Date", "Total"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className="pb-2 text-xs font-medium text-gray-400"
                      style={{ textAlign: i === 4 ? "right" : "left" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id}>
                  <td className="py-3 text-gray-800">#{o.id}</td>
                  <td className="py-3 text-gray-500">{o.user?.name ?? "—"}</td>
                  <td className="py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyle[o.status] ?? "bg-gray-100 text-gray-500"}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right text-gray-800">
                    ${o.totalPrice?.toLocaleString() ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
