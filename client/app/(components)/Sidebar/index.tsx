"use client";
import { setIsSidebarCollapsed } from "@/app/state";
import { LayoutDashboard, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSisebarCollapsed = useSelector(
    (state) => state.global.isSidebarCollasped,
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSisebarCollapsed));
  };

  const sidebarClassName = `fixed flex flex-col ${
    isSisebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  }  bg-white transition-all duration overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassName}>
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>
          <LayoutDashboard className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="font-extrabold text-2xl">FLOWSTOCK</h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
      {/* links here */}
      <div className="grow mt-8">{/* links here */}</div>

      <div>
        <p className="text-center text-xs text-gray-500 ">
          &copy; 2026 FlowStock
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
