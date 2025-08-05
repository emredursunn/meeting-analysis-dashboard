"use client";
import { useState } from "react";
import MeetingSummary from "./MeetingSummary";
import TasksList from "./TasksList";
import TopicsNotes from "./TopicsNotes";

const meetings = [
  "Toplantı 1 - Pazarlama",
  "Toplantı 2 - Ürün Geliştirme",
  "Toplantı 3 - Sprint Planlama",
  "Toplantı 4 - Retrospektif",
  "Toplantı 5 - Q&A",
];

interface SidebarProps {
  open?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ open = true, onToggle }: SidebarProps) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(meetings[0]);

  const filtered = meetings.filter((m) =>
    m.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`lg:fixed lg:top-0 lg:left-0 lg:h-screen shadow-xl flex flex-col transition-all duration-300 ease-in-out z-40
        ${open ? 'w-full p-6 mb-4 lg:mb-0 lg:w-[30rem]' : 'w-full p-2 mb-4 lg:mb-0 lg:w-8 lg:p-0'}
        lg:border-r border-gray-200 rounded-3xl lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none lg:rounded-bl-none`}
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: `
            linear-gradient(90deg,
              rgba(80, 180, 255, 0.9) 0%,
              rgba(170, 80, 255, 0.9) 40%,
              rgba(255,95, 210, 0.9) 100%)
          `
        }}
    >
      {/* Toggle butonu */}
      {onToggle && (
        <button
          type="button"
          aria-label={open ? 'Paneli Gizle' : 'Paneli Aç'}
          onClick={onToggle}
          className={`hidden lg:flex fixed items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white/90 backdrop-blur-md shadow transition-transform duration-300
            ${open ? '' : 'rotate-180'} top-1/2 -translate-y-1/2 z-[9999]`}
          style={{
            left: open ? 'calc(30rem - 12px)' : '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M7 5l5 5-5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* İçerik: mobilde her zaman göster, desktop'ta açıkken göster */}
      <div className={`flex-1 overflow-y-auto transition-opacity duration-200 scrollbar-hide ${open ? 'opacity-100 pointer-events-auto' : 'lg:opacity-0 lg:pointer-events-none opacity-100 pointer-events-auto'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Toplantılar</h2>
          <input
            type="text"
            placeholder="Toplantı ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-3 w-full bg-white/60 border border-gray-300 px-3 py-2 rounded-xl backdrop-blur-sm transition-all duration-200 hover:bg-white/80 focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <ul className="space-y-3">
            {filtered.map((m) => (
              <li key={m}>
                <button
                  onClick={() => setSelected(m)}
                  className={`w-full flex items-center text-left px-5 py-3 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm border
                    ${selected === m
                      ? "bg-indigo-100 text-indigo-800 border-indigo-300 shadow-lg scale-[1.03]"
                      : "bg-white/60 text-gray-700 border-gray-300 hover:bg-white/80 hover:shadow-md"}`}
                  style={{ boxShadow: selected === m ? '0 4px 24px 0 rgba(99,102,241,0.12)' : undefined }}
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 space-y-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-7 rounded-full bg-gradient-to-b from-indigo-400 to-sky-400 block"></span>
              <h3 className="font-bold text-gray-800 text-base">Toplantı Özeti</h3>
            </div>
            <div className="bg-indigo-50/40 rounded px-2 py-1">
              <MeetingSummary />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-7 rounded-full bg-gradient-to-b from-indigo-400 to-sky-400 block"></span>
              <h3 className="font-bold text-gray-800 text-base">Görevler</h3>
            </div>
            <div className="bg-indigo-50/40 rounded px-2 py-1">
              <TasksList />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-7 rounded-full bg-gradient-to-b from-indigo-400 to-sky-400 block"></span>
              <h3 className="font-bold text-gray-800 text-base">Konular ve Notlar</h3>
            </div>
            <div className="bg-indigo-50/40 rounded px-2 py-1">
              <TopicsNotes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
