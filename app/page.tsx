"use client";

import React, { useState, useEffect } from 'react';
import ShoutingChart from './components/ShoutingChart';
import EmotionTopicBarChart from './components/EmotionTopicBarChart';
import EmotionsRadarChart from './components/EmotionsRadarChart';
import CorrelationHeatmap from './components/CorrelationHeatmap';

// --- ANA DASHBOARD BİLEŞENİ ---
const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-[#0a0a0a] text-[#ededed] min-h-screen p-4 sm:p-8 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Toplantı Analiz Raporu</h1>
        <p className="text-lg text-gray-400 mt-2">Toplantı metriklerinin görselleştirilmiş analizi</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <ShoutingChart />
        </div>
        <div className="bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <EmotionsRadarChart />
        </div>
        <div className="bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <EmotionTopicBarChart />
        </div>
        <div className="lg:col-span-2 bg-[#171717] p-6 rounded-xl shadow-lg border border-gray-700">
          <CorrelationHeatmap />
        </div>
      </main>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Meeting Analysis Bot. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};

export default App;