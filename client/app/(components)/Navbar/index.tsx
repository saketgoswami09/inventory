"use client";

import { setIsDarkMode, setIsSidebarCollapsed } from "../../state/index";
import { Bell, ChevronLeft, Menu, Search, Settings, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // ⚡ Next.js optimized images
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  
  // Clean state selector mapping with typo tolerance handling
  const isSidebarCollapsed = useSelector(
    (state: any) => state.global.isSidebarCollapsed || state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector((state: any) => state.global.isDarkMode);

  return (
    <div className="flex justify-between rounded-xl  items-center w-full px-4 py-3 bg-white border-b border-gray-100 shadow-sm transition-all">
      
      {/* ─── LEFT PANEL SECTION ─── */}
      <div className="flex items-center gap-4">
        {/* Dynamic Action Trigger: Changes direction organically depending on state mappings */}
        {/* <button
          className="p-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          title={isSidebarCollapsed ? "Expand panel" : "Collapse panel"}
        >
          {isSidebarCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button> */}

        {/* Global Search Interface bar Layout */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search group & products..."
            className="pl-10 pr-4 py-2 w-48 sm:w-64 md:w-80 text-sm border border-gray-200 bg-gray-50/50 rounded-xl focus:outline-none focus:border-gray-900 focus:bg-white transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL ACTION UTILITIES ─── */}
      <div className="flex items-center gap-4">
        
        {/* Action Controls Container Group (Hidden on minor viewports) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Theme Dynamic Controller Switch */}
          <button 
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-500 animate-pulse" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          {/* Notification Alert Target Anchor */}
          <div className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full shadow-sm">
              3
            </span>
          </div>

          {/* Vertical Separator Divider rule matching standard dashboard view matrix frames */}
          <div className="h-5 w-[1px] bg-gray-200 mx-1" />

          {/* User Meta Card component profile interface block */}
          <Link href="/profile" prefetch={false} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="User dynamic interface avatar"
                fill
                sizes="32px"
                className="rounded-full object-cover ring-1 ring-gray-100 group-hover:ring-gray-300 transition-all"
                priority
              />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-950 transition-colors">
              Saket
            </span>
          </Link>
        </div>

        {/* Global Direct App Configuration Link Route */}
        <Link 
          href="/settings" 
          prefetch={false}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
          title="System Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;