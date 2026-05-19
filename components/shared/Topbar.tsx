"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserData } from "./Navbar";

const Topbar = () => {
  const [user, setUser] = useState<UserData | null>(null);
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
  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();
  return (
    <section className="fixed top-0 z-10 flex w-full justify-between border-b border-b-gray-200 py-4">
      <div className=" w-full flex flex-row items-center justify-between m-auto px-6">
        <div className="w-375 h-full flex flex-row items-center justify-center" />
        <div className="flex gap-8 p-2">
          <Link
            href={"/"}
            className=" w-10 h-10 rounded flex  justify-center items-center  "
          >
            <img
              src="/assets/icons/settings.svg"
              alt="settings"
              className="w-7.5 h-7.5 "
            />
          </Link>
          <Link
            href={"/"}
            className=" w-10 h-10 rounded flex  justify-center items-center  "
          >
            <img
              src="/assets/icons/bell.svg"
              alt="notifications"
              className="w-7.5 h-7.5 "
            />
          </Link>
          <Link
            href={`/profile/${user?.id}`}
            className=" w-10 h-10 rounded flex  justify-center items-center  "
          >
            <Avatar>
              <AvatarImage
                src="assets/icons/user.svg"
                alt="user"
                className="w-7.5 h-7.5 "
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
