// app/profile/page.tsx

"use client";

import { ImageIcon, Pencil } from "lucide-react";
import { useState } from "react";

export default function CompleteProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    designation: "",
    phone: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-6 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <h1 className="mb-10 text-3xl font-semibold text-[#222]">
          Complete your profile
        </h1>

        {/* Card */}
        <div className="rounded-[28px] border border-[#e5eefb] bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center justify-center">
              {/* Upload Circle */}
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-[#7aa0d8]">
                <ImageIcon
                  size={45}
                  className="text-[#7aa0d8]"
                />
              </div>

              <button className="mt-6 text-lg font-semibold text-[#1e5eb6]">
                Upload Photo
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {/* Name */}
              <div>
                <label className="mb-3 block text-sm font-medium text-[#3566a7]">
                  Your Name
                </label>

                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="h-12 rounded-lg border border-[#e2e8f0] px-4 outline-none transition focus:border-[#1e5eb6]"
                  />

                  <input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="h-12 rounded-lg border border-[#e2e8f0] px-4 outline-none transition focus:border-[#1e5eb6]"
                  />

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="h-12 rounded-lg border border-[#e2e8f0] px-4 outline-none transition focus:border-[#1e5eb6]"
                  />
                </div>
              </div>

              {/* Designation */}
              <div className="mt-7">
                <label className="mb-3 block text-sm font-medium text-[#3566a7]">
                  Your Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="h-12 w-full rounded-lg border border-[#e2e8f0] px-4 outline-none transition focus:border-[#1e5eb6]"
                />
              </div>

              {/* Phone + Email */}
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-sm font-medium text-[#3566a7]">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border border-[#e2e8f0] px-4 outline-none transition focus:border-[#1e5eb6]"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium text-[#3566a7]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border border-[#e2e8f0] px-4 outline-none transition focus:border-[#1e5eb6]"
                  />
                </div>
              </div>

              {/* Button */}
              <button className="mt-10 flex items-center gap-3 text-xl font-semibold text-[#222]">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-red-400 text-red-500">
                  <Pencil size={14} />
                </span>

                Edit/Update Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}