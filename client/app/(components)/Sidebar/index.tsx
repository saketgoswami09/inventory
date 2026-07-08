"use client";

import { setIsSidebarCollapsed } from "@/app/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  SlidersHorizontal,
  User,
  HelpCircle,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import plowLogo from "../../../public/plow_logo.svg";
import logoss from "../../../public/small.svg";

// ─── CONFIGURATION DATA ARRAYS ───
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

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} prefetch={false}>
      <div
        className={`mx-3 my-0.5 cursor-pointer flex items-center gap-3 rounded-xl transition-all duration-200 ${isCollapsed ? "justify-center px-2 py-2.5" : "justify-start px-4 py-2.5"
          } ${isActive
            ? "bg-gray-100 dark:bg-gray-800 text-gray-950 dark:text-gray-50 font-semibold"
            : "text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-950 dark:hover:text-gray-50"
          }`}
      >
        <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-gray-950 dark:text-gray-50" : "text-gray-500 dark:text-gray-500"}`} />
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
  const isSidebarCollapsed = useSelector((state: any) => state.global.isSidebarCollapsed);

  return (
    <div
      className={`fixed left-0 top-0 h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 z-40 shadow-sm ${isSidebarCollapsed ? "w-16" : "w-64"
        }`}
    >
      {/* Header Block */}
      <div className="flex items-center justify-between h-16 border-b border-gray-50 dark:border-gray-800 px-4 gap-2">

        {/* ─── DYNAMIC LOGO SWITCH ─── */}
        <div className="flex items-center overflow-hidden flex-1">
          {isSidebarCollapsed ? (
            /* Shown ONLY when shrunk */
            <div
              className="relative w-8 h-8 cursor-pointer transition-transform active:scale-95"
              onClick={() => dispatch(setIsSidebarCollapsed(false))}
            >
              <Image src={logoss} fill className="object-contain" alt="Small Logo" priority />
            </div>
          ) : (
            /* Shown ONLY when expanded */
            /* 🔧 FIXED: Swapped out w-18 h-18 for standardized w-32 h-10 aspect-ratio container framework */
            <div className="relative w-32 h-10">
              <Image src={plowLogo} fill className="object-contain object-left" alt="Full Logo" priority />
            </div>
          )}
        </div>

        {/* ─── TOGGLE BUTTON (Hidden when shrunk so it doesn't clip) ─── */}
        {!isSidebarCollapsed && (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(true))}
            className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0"
            title="Collapse Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Navigation Area */}
      <div className="grow py-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
        {PRIMARY_LINKS.map((link) => (
          <SidebarLink key={link.href} {...link} isCollapsed={isSidebarCollapsed} />
        ))}

        <div className="my-3 border-t border-gray-100 dark:border-gray-800 mx-3" />

        {SECONDARY_LINKS.map((link) => (
          <SidebarLink key={link.href} {...link} isCollapsed={isSidebarCollapsed} />
        ))}
      </div>

      {/* Persistent Footer Area */}
      <div className="mt-auto border-t border-gray-100 dark:border-gray-800 pt-2 pb-3 bg-gray-50/40 dark:bg-gray-900/40">
        {FOOTER_LINKS.map((link) => (
          <SidebarLink key={link.href} {...link} isCollapsed={isSidebarCollapsed} />
        ))}

        {/* Profile Card Trigger */}
        <Link href="/profile" prefetch={false}>
          <div className={`mx-3 mt-1 flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors ${isSidebarCollapsed ? "justify-center" : "justify-start px-4"
            }`}>
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
              <span className="text-[14px] font-medium text-gray-800 dark:text-gray-300 truncate">
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