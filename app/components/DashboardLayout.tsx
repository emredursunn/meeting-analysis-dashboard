"use client";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { SidebarOpenContext } from "../context/SidebarContext";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <SidebarOpenContext.Provider value={sidebarOpen}>
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col lg:block">
          <main className={`transition-all duration-300 flex-1 overflow-y-auto p-0 relative z-10 order-1 lg:order-2 ${sidebarOpen ? 'lg:ml-[30rem]' : 'lg:ml-8'}`}>{children}</main>
          <div className="order-2 lg:order-1">
            <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((v) => !v)} />
          </div>
        </div>
        {/* Footer - sidebar'dan sonra en altta */}
        <footer 
          className="flex items-center justify-center px-12 py-7 mt-10 shadow-xl text-white"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(80, 180, 255, 0.9) 0%,
                rgba(170, 80, 255, 0.9) 40%,
                rgba(255,95, 210, 0.9) 100%)
            `
          }}
        >
          <div className="company-logo">
            <Image src="/favicon.ico" alt="Company Logo" width={40} height={40} />
          </div>
          <span className="ml-3 text-base font-semibold tracking-wide">Aurora Solution &copy; {new Date().getFullYear()}</span>
        </footer>
      </div>
    </SidebarOpenContext.Provider>
  );
}
