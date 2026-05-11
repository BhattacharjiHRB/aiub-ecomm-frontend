import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Topbar = () => {
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
            href={"/"}
            className=" w-10 h-10 rounded flex  justify-center items-center  "
          >
            <Avatar>
              <AvatarImage
                src="assets/icons/user.svg"
                alt="user"
                className="w-7.5 h-7.5 "
              />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
