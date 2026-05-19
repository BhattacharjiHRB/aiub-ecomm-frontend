// app/cart/[userId]/page.tsx

import { axiosFetch } from "@/lib/axios";
import { currentUser } from "@/lib/CheckUser";
import Image from "next/image";

async function getCart(userId: number) {
  const res = await axiosFetch.get(`cart/${userId}`
   
   );

 const cart=res.data.data;
 return cart;
}

export default async function CartPage({
  params,
}: {
  params: { userId: string };
}) {
  const user=currentUser();
  const cart = await getCart(user?.id);

  const subtotal = cart.items.reduce(
    (acc: number, item: any) =>
      acc + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0e1117]">
              Shopping Cart
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {cart.items.length} Products
            </p>
          </div>

          <button className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white">
            Checkout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <table className="w-full">
                <thead className="border-b bg-[#f8fafc]">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-5 py-4 font-medium">
                      Product
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Price
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Quantity
                    </th>

                    <th className="px-5 py-4 font-medium">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cart.items.map((item: any) => (
                    <tr
                      key={item._id}
                      className="border-b"
                    >
                      {/* Product */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-xl border">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <h3 className="max-w-[250px] text-sm font-semibold text-gray-800">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              UPC: {item.upc}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-5 text-sm font-medium">
                        ${item.price}
                      </td>

                      {/* Quantity */}
                      <td className="px-5 py-5">
                        <div className="flex w-fit items-center overflow-hidden rounded-lg border">
                          <button className="px-3 py-2 text-lg">
                            -
                          </button>

                          <span className="px-4 py-2 text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button className="px-3 py-2 text-lg">
                            +
                          </button>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-5 text-sm font-semibold">
                        $
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-[#0e1117]">
                Cart Summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ${subtotal}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    $20
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Tax
                  </span>

                  <span className="font-medium">
                    $15
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      Total
                    </span>

                    <span className="text-xl font-bold text-red-500">
                      ${subtotal + 20 + 15}
                    </span>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-xl bg-[#0e1117] py-3 text-sm font-medium text-white">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}