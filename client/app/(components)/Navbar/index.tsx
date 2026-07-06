"use client";

import { Bell, Menu, Search, Sun } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      {/* left side */}
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 "
          onClick={() => {}}
        >
          <Menu />
        </button>
      </div>
      <div className="relative ">
        <input
          type="text"
          placeholder="Start type to search group & products"
          className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg  focus:outline-none focus:border-blue-500     "
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none  ">
          <Search className="text-gray-500" size={20} />
        </div>
      </div>
      {/* right side  */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5 ">
          <button>
            <Sun className="cursor-pointer text-gray-500" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
