"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ShoutingChart from "./components/ShoutingChart";
import EmotionTopicBarChart from "./components/EmotionTopicBarChart";
import EmotionsRadarChart from "./components/EmotionsRadarChart";
import CorrelationHeatmap from "./components/CorrelationHeatmap";
// import ParticipantActivityTimeline from "./components/ParticipantActivityTimeline";
import EmotionTimelineAreaChart from "./components/EmotionTimelineAreaChart";
import DashboardLayout from "./components/DashboardLayout";
import { useContext } from "react";
import { SidebarOpenContext } from "./context/SidebarContext";
import SpeakerTimelineChartCard from "./components/SpeakerTimelineChartCard";
import MeetingRadarChart from "./components/MeetingRadarChart";
import ChartCard from "./components/ChartCard";

// Profil menüsü bileşeni
const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Kapama için dışarı tıklama
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Örnek profil bilgisi
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "/favicon.ico"
  };

  return (
    <div className="ml-auto relative" ref={menuRef}>
      <button
        className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/80 hover:bg-white shadow border border-gray-200 transition min-w-[140px]"
        onClick={() => setOpen((v) => !v)}
        aria-label="Profil Menüsü"
      >
        <Image
          src={user.avatar}
          alt={user.name}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
        />
        <div className="text-left hidden md:block">
          <div className="font-semibold text-gray-900 text-sm leading-tight">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <svg width="18" height="18" fill="none" viewBox="0 0 20 20" className="ml-1">
          <path d="M6 8l4 4 4-4" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* Menü */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn">
          <button
            onClick={() => { setOpen(false); window.location.href = "/login"; }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// --- ANA DASHBOARD BILEŞENİ ---
const App = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("isAuthenticated");
      if (auth !== "true") {
        router.push("/login");
        return;
      }
    }
    setIsClient(true);
  }, [router]);

  const sidebarOpen = useContext(SidebarOpenContext);

  if (!isClient) return null;

  return (
    <DashboardLayout>
      <div className="bg-white text-[#171717] min-h-screen p-0 sm:p-0 font-sans">
        {/* Header */}
        <header 
          className="flex items-center px-2 md:px-4 py-2 mb-6 shadow-xl relative rounded-b-3xl mx-2 md:mx-4 text-white z-50"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(255,95, 210, 0.9) 0%,
                rgba(170, 80, 255, 0.9) 40%,
                rgba(80, 180, 255, 0.9) 100%)
            `
          }}
        >
          <div className="company-logo">
            <Image src="/favicon.ico" alt="Company Logo" width={44} height={44} />
          </div>
          <div>
            <h1 className="text-3xl md:text-2xl font-bold tracking-tight mb-1">Aurora Meeting Analysis</h1>
            <p className="text-base md:text-md opacity-80">AI-Driven Meeting Metrics Dashboard</p>
          </div>
          {/* Profil bilgisi sağ üstte */}
          <ProfileMenu />
        </header>

        {/* Main Grid */}
        <main className="flex flex-col py-4 gap-4 px-4 md:px-12">
          {/* 1. İlk satır: 2 chart */}
          <div className={`grid gap-4 ${
            sidebarOpen 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            <ChartCard 
              title="Toplantı Radar Analizi" 
              chartId="meeting-radar"
            >
              <MeetingRadarChart isPreview height={320} />
            </ChartCard>
            
            <ChartCard title="Konu Bazlı Duygular" chartId="emotion-topic">
              <EmotionTopicBarChart isPreview height={320} />
            </ChartCard>
          </div>

          {/* 2. İkinci satır: 3 chart */}
          <div className={`grid gap-4 ${
            sidebarOpen 
              ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
          }`}>
            <ChartCard title="Ses Seviyesi Analizi" chartId="shouting">
              <ShoutingChart isPreview height={320} />
            </ChartCard>
            
            <ChartCard title="Duygu Durumu Radar" chartId="emotions-radar">
              <EmotionsRadarChart isPreview height={320} />
            </ChartCard>
            
            <ChartCard title="Duygu Zaman Çizelgesi" chartId="emotion-timeline">
              <EmotionTimelineAreaChart height={320} isPreview />
            </ChartCard>
          </div>

          {/* 3. Üçüncü satır: 2 chart */}
          <div className={`grid gap-4 ${
            sidebarOpen 
              ? 'grid-cols-1 lg:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            <ChartCard title="Davranış Korelasyon Haritası" chartId="correlation">
              <CorrelationHeatmap isPreview height={320} />
            </ChartCard>
            
            <ChartCard title="Konuşmacı Zaman Çizelgesi" chartId="speaker-timeline">
              <SpeakerTimelineChartCard isPreview />
            </ChartCard>
          </div>
        </main>


      </div>
    </DashboardLayout>
  );
};

export default App;
