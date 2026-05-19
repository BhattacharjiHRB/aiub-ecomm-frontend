import { axiosFetch } from "@/lib/axios";
import { Mail, MapPin, Phone, User } from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await axiosFetch.get(`users/${Number(id)}`);
  const user = res.data.data;

  const initials = user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div style={{ padding: "1.5rem 0", maxWidth: 640, margin: "0 auto" }}>
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center text-blue-600 font-medium text-xl flex">
          {initials}
        </div>
        <div>
          <p className="text-2xl font-medium text-gray-900">{user.name}</p>
          <span className="mt-1 inline-block text-xs px-3 py-0.5 rounded-md bg-gray-100 text-gray-500 capitalize border border-gray-200">
            {user.role}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-bold text-blue-500">Account information</p>
        </div>

        <div className="divide-y divide-gray-100 px-5">
          {[
            {
              icon: <User size={18} className="flex" />,
              label: "Username",
              value: user.username,
            },
            {
              icon: <Mail size={18} className="flex" />,
              label: "Email",
              value: user.email,
            },
            {
              icon: <Phone size={18} className="flex" />,
              label: "Phone",
              value: user.phoneNumber,
            },
            {
              icon: <MapPin size={18} className="flex" />,
              label: "Address",
              value: user.address,
            },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3.5">
              {icon}
              <div className="flex flex-1 justify-between items-center">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm text-gray-900">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
