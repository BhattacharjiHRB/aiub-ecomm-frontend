"use client";

import { axiosFetch } from "@/lib/axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Merchant {
  id: number;
  name: string;
  email: string;
  username: string;
  address: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
}

export default function MerchantsTable() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosFetch.get("users/merchants/all");
        setMerchants(res.data.data[1] ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleActive = async (m: Merchant) => {
    try {
      await axiosFetch.patch(`users/${m.id}`, { isActive: !m.isActive });
      setMerchants((prev) =>
        prev.map((u) => (u.id === m.id ? { ...u, isActive: !u.isActive } : u)),
      );
      toast.success(
        `${m.name} marked as ${!m.isActive ? "active" : "inactive"}`,
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteMerchant = async (m: Merchant) => {
    if (!confirm(`Delete ${m.name}? This cannot be undone.`)) return;
    try {
      await axiosFetch.delete(`users/${m.id}`);
      setMerchants((prev) => prev.filter((u) => u.id !== m.id));
      toast.success(`${m.name} deleted`);
    } catch {
      toast.error("Failed to delete merchant");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-bold">Merchants</p>
        <span className="text-xs text-gray-400">{merchants.length} total</span>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-6 text-center">Loading...</p>
      ) : merchants.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No merchants found.
        </p>
      ) : (
        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="border-b border-gray-100">
              {[
                "ID",
                "Name",
                "Username",
                "Email",
                "Phone",
                "Address",
                "Status",
                "Joined",
                "Active",
                "",
              ].map((h, i) => (
                <th
                  key={h + i}
                  className="pb-2 text-xs font-medium text-gray-400"
                  style={{
                    textAlign: i >= 8 ? "center" : "left",
                    width:
                      i === 0
                        ? "5%"
                        : i === 6
                          ? "8%"
                          : i === 8 || i === 9
                            ? "5%"
                            : "auto",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {merchants.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 text-gray-400">#{m.id}</td>
                <td className="py-3 text-gray-800 font-medium truncate">
                  {m.name}
                </td>
                <td className="py-3 text-gray-500 truncate">{m.username}</td>
                <td className="py-3 text-gray-500 truncate">{m.email}</td>
                <td className="py-3 text-gray-500">{m.phoneNumber}</td>
                <td className="py-3 text-gray-500 truncate">{m.address}</td>
                <td className="py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${m.isActive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
                  >
                    {m.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 text-gray-400">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 text-center">
                  <input
                    type="checkbox"
                    checked={m.isActive}
                    onChange={() => toggleActive(m)}
                    className="w-4 h-4 accent-emerald-600 cursor-pointer"
                    title={m.isActive ? "Deactivate" : "Activate"}
                  />
                </td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => deleteMerchant(m)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title="Delete merchant"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
