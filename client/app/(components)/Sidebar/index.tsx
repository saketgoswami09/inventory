"use client";

import { setIsSidebarCollapsed } from "@/app/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LayoutDashboard,
  LucideIcon,
  SlidersHorizontal,
  User,
  HelpCircle,
  
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// ─── 1. CONFIGURATION DATA ARRAYS (The Senior Way) ───
const PRIMARY_LINKS = [
  { href: "/dashboard", icon: Layout, label: "Dashboard" },
  { href: "/inventory", icon: Archive, label: "Inventory" },
  { href: "/products", icon: Clipboard, label: "Products" },
];

const SECONDARY_LINKS = [
  { href: "/users", icon: User, label: "Users" },
  { href: "/expenses", icon: CircleDollarSign, label: "Expenses" },
];

const FOOTER_LINKS = [
  { href: "/help", icon: HelpCircle, label: "Help and support" },
  { href: "/settings", icon: SlidersHorizontal, label: "Settings" },
];

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} prefetch={false}>
      <div
        className={`mx-3 my-0.5 cursor-pointer flex items-center gap-3 rounded-xl transition-all duration-200 ${
          isCollapsed
            ? "justify-center px-2 py-2.5"
            : "justify-start px-4 py-2.5"
        } ${
          isActive
            ? "bg-gray-100 text-gray-950 font-semibold"
            : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
        }`}
      >
        <Icon
          className={`w-5 h-5 shrink-0 ${isActive ? "text-gray-950" : "text-gray-500"}`}
        />
        {!isCollapsed && (
          <span className="text-[14px] font-medium tracking-tight truncate">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();

  // 🎯 Refactored selector to target the clean, typo-free Redux slice state variable name
  const isSidebarCollapsed = useSelector(
    (state: any) => state.global.isSidebarCollapsed,
  );

  return (
    <div
      className={`fixed left-0 top-0 h-full flex flex-col bg-white border-r border-gray-100 transition-all duration-300 z-40 shadow-sm ${
        isSidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header Block */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 bg-linear-to-tr from-orange-500 via-amber-800 to-stone-900 rounded-xl shadow-inner text-white flex-shrink-0">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          {!isSidebarCollapsed && (
            <span className="font-bold text-base text-gray-900 tracking-tight select-none">
              FLOWSTOCK
            </span>
          )}
        </div>

        <button
          onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
        >
            <LayoutDashboard className="w-5 h-5 p-2 bg-linear-to-tr from-orange-500 via-amber-800 to-stone-900 rounded-xl shadow-inner text-white shrink-0 animate-spin transition" />
         
        </button>
      </div>

      {/* Main Navigation Area (DRY Dynamic Render Mapping) */}
      <div className="grow py-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {PRIMARY_LINKS.map((link) => (
          <SidebarLink
            key={link.href}
            {...link}
            isCollapsed={isSidebarCollapsed}
          />
        ))}

        {/* Subtle Section Divider */}
        <div className="my-3 border-t border-gray-100 mx-3" />

        {SECONDARY_LINKS.map((link) => (
          <SidebarLink
            key={link.href}
            {...link}
            isCollapsed={isSidebarCollapsed}
          />
        ))}
      </div>

      {/* Persistent Footer Area */}
      <div className="mt-auto border-t border-gray-100 pt-2 pb-3 bg-gray-50/40">
        {FOOTER_LINKS.map((link) => (
          <SidebarLink
            key={link.href}
            {...link}
            isCollapsed={isSidebarCollapsed}
          />
        ))}

        {/* Profile Card Trigger */}
        <Link href="/profile" prefetch={false}>
          <div
            className={`mx-3 mt-1 flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors ${
              isSidebarCollapsed ? "justify-center" : "justify-start px-4"
            }`}
          >
            <div className="relative w-5 h-5 shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                alt="User avatar"
                fill
                sizes="20px"
                className="rounded-full object-cover ring-1 ring-gray-200"
                priority
              />
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[14px] font-medium text-gray-800 truncate">
                My Profile
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
