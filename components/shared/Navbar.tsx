"use client";

import { BaggageClaimIcon, LogOut, StoreIcon, UserCheck } from "lucide-react";

import { useEffect, useState } from "react";

import Cart from "./Cart";
import SearchBar from "./Search";
import Wishlist from "./WhishList";

interface UserData {
  id: number;
  name?: string;
  email?: string;
  role?: string;
  token?: string;
}

function Navbar() {
  const [user, setUser] = useState<UserData | null>(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("data") : null;

    if (storedUser) {
      try {
        if (storedUser.startsWith("eyJ")) {
          const payload = storedUser.split(".")[1];
          const decoded = JSON.parse(atob(payload));
          setUser(decoded);
        } else {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("data");
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("data");
    setUser(null);
    window.location.href = "/login";
  };

  const getDashboardRoute = () => {
    if (!user) return "/";

    switch (user.role?.toLowerCase()) {
      case "merchant":
        return "/dashboard/merchant";
      case "admin":
        return "/dashboard/admin";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/">
              <div className="flex items-center gap-2">
                <BaggageClaimIcon className="w-8 h-8 text-blue-600" />

                <span className="text-xl font-semibold text-gray-900">
                  Aiub <br /> E-comm
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-2 text-sm ml-10">
              <StoreIcon className="w-5 h-5 text-gray-500" />

              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Your Store</span>

                <span className="text-sm font-medium text-gray-900">
                  ABC Shop
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <SearchBar />

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {(user.role === "merchant" || user.role === "admin") && (
                  <a href={getDashboardRoute()}>
                    <button className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                      <StoreIcon className="w-5 h-5" />
                      {user.role === "admin"
                        ? "Admin Dashboard"
                        : "Go To Dashboard"}
                    </button>
                  </a>
                )}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition text-sm font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Become a Merchant Button - Only shows when not logged in */}
                <a href="/become-merchant">
                  <button className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    <UserCheck className="w-5 h-5" />
                    Become a Merchant
                  </button>
                </a>

                {/* Sign In Button - Only shows when not logged in */}
                <a href="/login">
                  <button className="flex items-center gap-2 border border-blue-600 rounded-xl p-2 text-gray-700 hover:bg-blue-600 hover:text-white transition cursor-pointer">
                    <i className="ti ti-user text-lg"></i>

                    <span className="hidden sm:inline text-sm">Sign in</span>

                    <i className="ti ti-chevron-down text-xs"></i>
                  </button>
                </a>
              </>
            )}

            <Wishlist />

            <Cart userId={user?.id || 0} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
