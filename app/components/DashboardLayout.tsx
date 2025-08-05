"use client";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { SidebarOpenContext } from "../context/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <SidebarOpenContext.Provider value={sidebarOpen}>
      <div className="w-full min-h-screen flex flex-col md:block">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
        <main className={`transition-all duration-300 flex-1 overflow-y-auto p-0 md:ml-0 relative z-10 order-1 md:order-2 ${sidebarOpen ? 'md:ml-[30rem]' : 'md:ml-8'}`}>{children}</main>
      </div>
    </SidebarOpenContext.Provider>
  );
}
