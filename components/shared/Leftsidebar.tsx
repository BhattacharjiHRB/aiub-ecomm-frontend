"use client";

import { sidebarLinks } from "@/lib/constans/index";
import { BaggageClaimIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function LeftSidebar() {
  const path = usePathname();

  return (
    <section className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-hidden bg-[#F7F7F7] pb-5 pt-10">
      <Link
        href={"/"}
        className="flex flex-row justify-center items-center mb-16 gap-3"
      >
        <div className="flex items-center gap-2">
          <BaggageClaimIcon className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold text-gray-900">
            Aiub <br /> E-comm
          </span>
        </div>
      </Link>

      <div className="flex w-full flex-1 flex-col gap-2 px-8 mt-12">
        {sidebarLinks.map((link) => {
          const active =
            (path.includes(link.route) && link.route.length > 1) ||
            path === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-2 mt-4 rounded-lg p-2${active && "transition duration-500 ease-in-out bg-blue-700 rounded-full text-white"}`}
            >
              <img
                src={link.imgUrl}
                alt={link.label}
                className="w-5 h-5 object-contain"
              />
              <p className="text-center">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <Button className="relative w-full bg-transparent flex gap-2 text-red-600 hover:bg-inherit ">
          <img
            src="/assets/icons/logout.svg"
            alt="logout"
            className="w-5 h-5 "
          />
          <p>Logout</p>
        </Button>
      </div>
    </section>
  );
}

export default LeftSidebar;
