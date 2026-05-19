"use client";

import { axiosFetch } from "@/lib/axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const roleStyle: Record<string, string> = {
  admin: "bg-violet-50 text-violet-700",
  merchant: "bg-blue-50 text-blue-700",
  customer: "bg-gray-100 text-gray-600",
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosFetch.get("users/all");
        setUsers(res.data.data.users ?? []);
        setTotal(res.data.data.total ?? 0);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setDeleting(id);
    try {
      await axiosFetch.delete(`users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setTotal((prev) => prev - 1);
      toast.success("User deleted");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-800">Users</p>
        <span className="text-xs text-gray-400">{total} total</span>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 py-6 text-center">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">
          No users found.
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
                "Role",
                "Status",
                "Joined",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="pb-2 text-xs font-medium text-gray-400 text-left"
                  style={{
                    width:
                      i === 0
                        ? "5%"
                        : i === 8
                          ? "5%"
                          : i === 5
                            ? "9%"
                            : i === 6
                              ? "8%"
                              : "auto",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 text-gray-400">#{u.id}</td>
                <td className="py-3 text-gray-800 font-medium truncate">
                  {u.name}
                </td>
                <td className="py-3 text-gray-500 truncate">{u.username}</td>
                <td className="py-3 text-gray-500 truncate">{u.email}</td>
                <td className="py-3 text-gray-500">{u.phoneNumber}</td>
                <td className="py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full capitalize ${roleStyle[u.role] ?? "bg-gray-100 text-gray-500"}`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${u.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-100 text-red-700"}`}
                  >
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={deleting === u.id}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                    aria-label="Delete user"
                  >
                    <Trash2 size={14} />
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
