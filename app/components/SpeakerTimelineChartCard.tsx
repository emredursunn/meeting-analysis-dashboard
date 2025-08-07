import React, { useMemo, useState } from "react";
import SpeakerTimelineChart from "./SpeakerTimelineChart";
import konusmaciAnalizi from "../data/konusmaci_analizi.json";
import type { KonusmaciAnaliziData } from "./types/konusmaciAnalizi";

const COLORS = [
  "#3B82F6", // blue
  "#F59E0B", // amber
  "#10B981", // green
  "#EF4444", // red
  "#8B5CF6", // violet
  "#F472B6", // pink
  "#6366F1", // indigo
  "#FBBF24", // yellow
  "#06B6D4", // cyan
  "#A3E635", // lime
];

const data: KonusmaciAnaliziData = konusmaciAnalizi as KonusmaciAnaliziData;

const SpeakerTimelineChartCard: React.FC = () => {
  // Tüm konuşmacılar gösterilecek
  const filteredSpeakers = data.speakers;

  const [hovered, setHovered] = useState<string|null>(null);

  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    filteredSpeakers.forEach((s, i) => {
      map[s.name] = COLORS[i % COLORS.length];
    });
    return map;
  }, [filteredSpeakers]);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="text-2xl font-bold text-gray-800">Konuşmacı Zaman Çizelgesi</div>
      </div>
      <SpeakerTimelineChart speakers={filteredSpeakers} colorMap={colorMap} />
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {data.speakers.map((s) => (
          <div
            key={s.name}
            onMouseEnter={() => setHovered(s.name)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            <span
              className="px-3 py-1 rounded-full text-sm font-medium border transition flex items-center gap-2 cursor-pointer"
              style={{
                background: colorMap[s.name],
                color: '#fff',
                borderColor: colorMap[s.name],
                boxShadow: hovered === s.name ? '0 2px 8px 0 rgba(0,0,0,0.12)' : undefined,
                opacity: hovered && hovered !== s.name ? 0.6 : 1,
              }}
            >
              {s.name}
            </span>
            {hovered === s.name && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 bg-white text-gray-800 rounded-xl shadow-lg border px-4 py-3 text-xs min-w-[180px]" style={{top: '100%'}}>
                <div className="font-bold text-base mb-1">{s.name}</div>
                <div><span className="font-semibold">Toplam Süre:</span> {s.totalDurationFormatted}</div>
                <div><span className="font-semibold">Konuşma Oranı:</span> %{s.speakingPercentage}</div>
                <div><span className="font-semibold">Saniye:</span> {s.totalDuration.toFixed(1)}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* İstatistik Kutusu */}
      <div className="mt-8 space-y-6">
        {(() => {
          const sorted = [...data.speakers].sort((a, b) => b.totalDuration - a.totalDuration);
          const most = sorted[0];
          const least = sorted[sorted.length-1];
          return (
            <>
              {/* İlk satır - 3 kart */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-gradient-to-tr from-blue-100 to-blue-50 border border-blue-200 rounded-2xl shadow flex flex-col items-center px-6 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3B82F6"/><path d="M12 7v5l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-semibold text-blue-700">En Fazla Katılım</span>
                  </div>
                  <span className="text-lg font-bold text-blue-900">{most.name}</span>
                  <span className="text-blue-700 mt-1">{most.totalDurationFormatted} / %{most.speakingPercentage}</span>
                </div>
                <div className="bg-gradient-to-tr from-pink-100 to-pink-50 border border-pink-200 rounded-2xl shadow flex flex-col items-center px-6 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#EC4899"/><path d="M12 17v-5l-3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="font-semibold text-pink-700">En Az Katılım</span>
                  </div>
                  <span className="text-lg font-bold text-pink-900">{least.name}</span>
                  <span className="text-pink-700 mt-1">{least.totalDurationFormatted} / %{least.speakingPercentage}</span>
                </div>
                <div className="bg-gradient-to-tr from-gray-100 to-gray-50 border border-gray-200 rounded-2xl shadow flex flex-col items-center px-6 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" fill="#6366F1"/><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">{data.speakers.length}</text></svg>
                    <span className="font-semibold text-gray-700">Toplam Konuşmacı</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{data.speakers.length}</span>
                </div>
              </div>

              {/* İkinci satır - 3 kart */}
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-gradient-to-tr from-yellow-100 to-yellow-50 border border-yellow-200 rounded-2xl shadow flex flex-col items-center px-6 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#FBBF24"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="font-semibold text-green-700">Toplam Toplantı Süresi</span>
                  </div>
                  <span className="text-lg font-bold text-green-900">{data.meetingInfo.totalMeetingDurationFormatted.split(".")[0]}</span>
                </div>
                <div className="bg-gradient-to-tr from-green-100 to-green-50 border border-green-200 rounded-2xl shadow flex flex-col items-center px-6 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22C55E"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="font-semibold text-green-700">Toplam Konuşma Süresi</span>
                  </div>
                  <span className="text-lg font-bold text-green-900">{data.meetingInfo.totalSpeakingDurationFormatted.split(".")[0]}</span>
                </div>
                <div className="bg-gradient-to-tr from-purple-100 to-purple-50 border border-purple-200 rounded-2xl shadow flex flex-col items-center px-6 py-4 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#8B5CF6"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    <span className="font-semibold text-purple-700">Konuşma Oranı</span>
                  </div>
                  <span className="text-lg font-bold text-purple-900">%{data.meetingInfo.speakingToMeetingRatio}</span>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default SpeakerTimelineChartCard;
