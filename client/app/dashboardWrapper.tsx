"use client";

import { useSelector } from "react-redux";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider from "./redux";
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollasped = useSelector(
    (state) => state.global.isSidebarCollasped,
  );
  const isDarkMode = useSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={`${isDarkMode ? "dark" : "light"} flex bg-gray-50 text-gray-500 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollasped ? "md:pl-24" : "md:pl-72"}  `}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout> {children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
