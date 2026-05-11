import MerchantCreationForm from "@/components/forms/MerchantCreationg";
import { ShieldCheck, Store, TrendingUp } from "lucide-react";

export default function BecomeMerchantPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Store className="h-4 w-4" />
                Trusted by Thousands of Sellers
              </div>

              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
                Become a <span className="text-primary">Merchant</span> & Grow
                Your Business Online
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Join our marketplace to showcase your products, reach more
                customers, and manage your business effortlessly with powerful
                tools and analytics.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg">Boost Sales</h3>

                <p className="text-sm text-muted-foreground mt-2">
                  Reach thousands of potential buyers instantly.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg">Secure Platform</h3>

                <p className="text-sm text-muted-foreground mt-2">
                  Safe payments and reliable merchant protection.
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Store className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg">Easy Management</h3>

                <p className="text-sm text-muted-foreground mt-2">
                  Manage products, orders, and inventory with ease.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="rounded-3xl border bg-white/90 backdrop-blur p-8 shadow-2xl">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold">
                Create Your Merchant Account
              </h2>

              <p className="mt-2 text-muted-foreground">
                Fill in your details to start your journey with us.
              </p>
            </div>

            <MerchantCreationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
