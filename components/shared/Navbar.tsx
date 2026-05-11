import {
  BaggageClaimIcon,
  Search,
  ShoppingCartIcon,
  StoreIcon,
  UserCheck,
} from "lucide-react";
import Wishlist from "./WhishList";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by Item No., Item Name, UPC, or Brand"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-full text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5 text-blue-900" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="/become-merchant">
              <button className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                <UserCheck className="w-5 h-5" />
                Become a Merchant
              </button>
            </a>
            <a href="/login">
              <button className="flex items-center gap-2 border border-blue-600 rounded-xl p-2 text-gray-700 hover:bg-blue-600 hover:text-primary-foreground cursor-pointer">
                <i className="ti ti-user text-lg"></i>
                <span className="hidden sm:inline text-sm">Sign in</span>
                <i className="ti ti-chevron-down text-xs"></i>
              </button>
            </a>
            <Wishlist />
            <button className="relative text-gray-700 hover:text-gray-900">
              <ShoppingCartIcon className="w-6 h-6 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
