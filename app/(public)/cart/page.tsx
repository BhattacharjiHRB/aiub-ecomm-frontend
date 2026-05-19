// import { axiosFetch } from "@/lib/axios";
// import { currentUser } from "@/lib/CheckUser";
// import Image from "next/image";

// async function getCart(userId: number) {
//   try {
//     const res = await axiosFetch.get(`/cart/${userId}`);

//     return res.data.data;
//   } catch (error) {
//     console.error("Cart Fetch Error:", error);

//     return {
//       id: null,
//       items: [],
//     };
//   }
// }

// export default async function CartPage() {
//   const user = await currentUser();

//   if (!user?.id) {
//     return <div className="p-10 text-center text-red-500">User not found</div>;
//   }

//   const cart = await getCart(user.id);

//   const subtotal = cart.items.reduce(
//     (acc: number, item: any) =>
//       acc + item.quantity * Number(item.product.price),
//     0,
//   );

//   return (
//     <div className="min-h-screen bg-[#f5f6fa] p-6">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-[#0e1117]">Shopping Cart</h1>

//             <p className="mt-1 text-sm text-gray-500">
//               {cart.items.length} Products
//             </p>
//           </div>

//           <button className="rounded-xl bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600">
//             Checkout
//           </button>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-3">
//           {/* LEFT */}
//           <div className="lg:col-span-2">
//             <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//               <table className="w-full">
//                 <thead className="border-b bg-[#f8fafc]">
//                   <tr className="text-left text-sm text-gray-500">
//                     <th className="px-6 py-4 font-medium">Product</th>

//                     <th className="px-6 py-4 font-medium">Price</th>

//                     <th className="px-6 py-4 font-medium">Quantity</th>

//                     <th className="px-6 py-4 font-medium">Total</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {cart.items.map((item: any) => {
//                     const product = item.product;

//                     return (
//                       <tr key={item.id} className="border-b">
//                         {/* PRODUCT */}
//                         <td className="px-6 py-5">
//                           <div className="flex items-center gap-4">
//                             <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-gray-100">
//                               <Image
//                                 src={
//                                   product.imageUrl ||
//                                   "https://placehold.co/300x300/png"
//                                 }
//                                 alt={product.name}
//                                 fill
//                                 className="object-cover"
//                               />
//                             </div>

//                             <div>
//                               <h3 className="max-w-[250px] text-sm font-semibold text-gray-800">
//                                 {product.name}
//                               </h3>

//                               <p className="mt-1 text-xs text-gray-500">
//                                 Category: {product.category}
//                               </p>

//                               <p className="mt-1 text-xs text-gray-400">
//                                 Stock: {product.stock}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         {/* PRICE */}
//                         <td className="px-6 py-5 text-sm font-medium">
//                           ${Number(product.price).toFixed(2)}
//                         </td>

//                         {/* QUANTITY */}
//                         <td className="px-6 py-5">
//                           <div className="flex w-fit items-center overflow-hidden rounded-lg border">
//                             <button className="px-3 py-2 text-lg">-</button>

//                             <span className="px-4 py-2 text-sm font-medium">
//                               {item.quantity}
//                             </span>

//                             <button className="px-3 py-2 text-lg">+</button>
//                           </div>
//                         </td>

//                         {/* TOTAL */}
//                         <td className="px-6 py-5 text-sm font-semibold">
//                           ${(item.quantity * Number(product.price)).toFixed(2)}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               {/* EMPTY CART */}
//               {cart.items.length === 0 && (
//                 <div className="p-10 text-center text-gray-500">
//                   Your cart is empty
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div>
//             <div className="rounded-2xl bg-white p-6 shadow-sm">
//               <h2 className="mb-6 text-xl font-bold text-[#0e1117]">
//                 Cart Summary
//               </h2>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Subtotal</span>

//                   <span className="font-medium">${subtotal.toFixed(2)}</span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Shipping</span>

//                   <span className="font-medium">$20.00</span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-500">Tax</span>

//                   <span className="font-medium">$15.00</span>
//                 </div>

//                 <div className="border-t pt-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-lg font-bold">Total</span>

//                     <span className="text-xl font-bold text-red-500">
//                       ${(subtotal + 20 + 15).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 <button className="mt-6 w-full rounded-xl bg-[#0e1117] py-3 text-sm font-medium text-white transition hover:bg-black">
//                   Proceed To Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
