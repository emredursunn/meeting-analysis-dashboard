"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="bg-[#0a0a0a] text-[#ededed] min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#171717] p-4 border-r border-gray-700 flex flex-col">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <nav className="flex flex-col space-y-4">
          <div>
            <label htmlFor="meeting-select" className="block text-sm font-medium text-gray-400 mb-2">
              Select Meeting
            </label>
            <select
              id="meeting-select"
              className="w-full bg-[#272727] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Meeting 1 - Q1 Review</option>
              <option>Meeting 2 - Project Phoenix Kick-off</option>
              <option>Meeting 3 - Marketing Sync</option>
            </select>
          </div>
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
