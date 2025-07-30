"use client";

import React, { useState, useEffect } from "react";
import ShoutingChart from "./components/ShoutingChart";
import EmotionTopicBarChart from "./components/EmotionTopicBarChart";
import EmotionsRadarChart from "./components/EmotionsRadarChart";
import CorrelationHeatmap from "./components/CorrelationHeatmap";
import ParticipantActivityTimeline from "./components/ParticipantActivityTimeline";
import EmotionTimelineAreaChart from "./components/EmotionTimelineAreaChart";

// --- ANA DASHBOARD BILEŞENİ ---
const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="bg-[#0a0a0a] text-[#ededed] min-h-screen p-4 sm:p-8 font-sans">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Toplantı Analiz Raporu</h1>
        <p className="text-lg text-gray-400 mt-2">Toplantı metriklerinin görselleştirilmiş analizi</p>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Satır: Shouting Chart (tam genişlik) */}
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <ShoutingChart />
        </div>

        {/* 2. Satır: Participant Activity Timeline (tam genişlik) */}
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <ParticipantActivityTimeline />
        </div>

        {/* 3. Satır: Emotion Timeline Area Chart (tam genişlik) */}
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <EmotionTimelineAreaChart />
        </div>

        {/* 4. Satır: Radar + Topic Bar */}
        <div className="bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <EmotionsRadarChart />
        </div>
        <div className="bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <EmotionTopicBarChart />
        </div>

        {/* 5. Satır: Correlation Heatmap (tam genişlik) */}
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <CorrelationHeatmap />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Meeting Analysis Bot. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default App;
