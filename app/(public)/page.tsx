import HeroBanner from "@/components/shared/HeroBanner";

import { axiosFetch } from "@/lib/axios";
import ProductSection from "./_components/ProductsSection";

export default async function Home() {
  const res = await axiosFetch.get("products");
  const newProduct = res.data.data;

  return (
    <div className="space-x-6 space-y-10 mb-5">
      <HeroBanner />
      <ProductSection products={newProduct} />
    </div>
  );
}
