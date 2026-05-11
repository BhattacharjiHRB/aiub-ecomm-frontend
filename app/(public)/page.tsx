"use client";

import HeroBanner from "@/components/shared/HeroBanner";
import ProductCard from "@/components/shared/ProductCard";

const CATEGORIES = [
  {
    id: 1,
    name: "Groceries",
    icon: "🛒",
    color: "from-orange-400 to-orange-500",
  },
  { id: 2, name: "Smartphone", icon: "📱", color: "from-pink-400 to-pink-500" },
  { id: 3, name: "Drinks", icon: "🥤", color: "from-blue-400 to-blue-500" },
  {
    id: 4,
    name: "Tobacco",
    icon: "🚬",
    color: "from-yellow-400 to-yellow-500",
  },
  { id: 5, name: "Candy & Gums", icon: "🍭", color: "from-red-400 to-red-500" },
  {
    id: 6,
    name: "Automatives",
    icon: "🚗",
    color: "from-purple-400 to-purple-500",
  },
  {
    id: 7,
    name: "Home & health",
    icon: "🏠",
    color: "from-green-400 to-green-500",
  },
  {
    id: 8,
    name: "Store Use",
    icon: "🏪",
    color: "from-indigo-400 to-indigo-500",
  },
];

export default function Home() {
  const handleAddToCart = () => {
    console.log("Added to cart!");
  };

  return (
    <div className="space-x-6 space-y-10 mb-5">
      <HeroBanner />
      <section className="py-16 px-4 md:px-8 max-w-7xl ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="group cursor-pointer">
              <div
                className={`bg-linear-to-br outline-1 outline-blue-950 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2`}
              >
                <div className="text-5xl mb-2">{category.icon}</div>
                <span className="text-center text-sm font-semibold group-hover:scale-110 transition-transform">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="flex items-center justify-between mb-2 bg-linear-to-r from-[#E64644] from-40% to-[#396EAD] p-6 my-5 rounded-2xl">
        <h2 className="text-2xl md:text-4xl font-bold text-white">
          {" "}
          New Products{" "}
        </h2>
        <p className="text-lg font-semibold text-white hover:underline transition ">
          Explore All Items
        </p>
      </div>
      <div className="grid grid-cols-6 gap-6 mt-5">
        <ProductCard
          id="1003051309"
          itemNumber="7356317563276"
          title="ALANI NU ENERGY BREEZEBERY"
          price={150}
          volume="12.00"
          volumeUnit="oz"
          imageUrl="/assets/image/dealz-logo.svg"
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
