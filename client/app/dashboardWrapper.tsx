"use client";

import { useSelector } from "react-redux";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider from "./redux";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // 🔧 Fixed Selector Typo: Matches your updated Redux slice exactly
  const isSidebarCollapsed = useSelector(
    (state: any) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useSelector((state: any) => state.global.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="flex bg-gray-50 text-gray-500 w-full min-h-screen">
      <Sidebar />
      {/* 🔧 Layout & Padding Fix:
        - Switched selector variables to 'isSidebarCollapsed'
        - Added 'transition-all duration-300' so the dashboard shifts smoothly alongside the sidebar
      */}
      <main
        className={`flex flex-col flex-1 min-h-screen py-7 px-9 bg-gray-50 transition-all duration-300 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        <div className="flex-1 w-full mt-6">
          {children}
        </div>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;