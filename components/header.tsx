"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./button";
import useAuthModel from "@/hooks/useAuthModel";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModel = useAuthModel();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // todo: reset any playing songs
    router.refresh();
    if (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div
      className={twMerge(
        `h-fit
         bg-gradient-to-b
         from-emerald-800
         p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="text-black
                 bg-white
                  hover:bg-gray-800 
                  focus:outline-none focus:ring-4 focus:ring-blue-300 
                  font-medium 
                  rounded-full text-sm 
                  px-5 py-2.5 text-center 
                  me-2 mb-2 dark:bg-white-600
                   dark:hover:bg-white-700
                    dark:focus:ring-white-800"
              >
                <FaUserAlt />
              </button>
            </div>
          ) : (
            <div>
              <Button
                onClick={authModel.onOpen}
                className="bg-transparent
                 text-neutral-300 
                 font-medium"
              >
                Sign up
              </Button>
              <button
                type="button"
                onClick={authModel.onOpen}
                className="text-black
                 bg-white hover:bg-white-800 
                 focus:outline-none focus:ring-4
                  focus:ring-blue-300 font-medium 
                  rounded-full text-sm px-5 py-2.5
                   text-center me-2 mb-2 
                   dark:bg-white-600 
                   dark:hover:bg-white-700
                    dark:focus:ring-white-800"
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
