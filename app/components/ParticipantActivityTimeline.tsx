'use client'
import React, { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import type { ChangeEvent, FC } from "react";

/**
 * ParticipantActivityTimeline.tsx
 * -------------------------------------------------------
 * Katılımcı Katkı Zaman Çizelgesi (Audio / Video / Presentation)
 *  • X ekseni: saniye (0 → toplantı süresi)
 *  • Y ekseni: katılımcı (e‑posta veya isim)
 *  • 3 yığılmış bar: Audio (mavi), Video (mor), Presentation (turuncu)
 *
 * Props:
 *   data: {
 *     actor: string;
 *     duration: number;                     // toplam süre (sn)
 *     audio_statistics: number;             // audio süresi (sn)
 *     video_send_statistics: number;        // video süresi (sn)
 *     presentation_send_statistics: number; // sunum süresi (sn)
 *   }[]
 * -------------------------------------------------------
 */

const activityData = [
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 1560,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 250,
    "video_send_statistics": 800,
    "presentation_send_statistics": 260,
    "id": "C_2025052310",
    "actor": "John",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 1560,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 750,
    "video_send_statistics": 0,
    "presentation_send_statistics": 300,
    "id": "C_2025052310",
    "actor": "Orion",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 1560,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 200,
    "video_send_statistics": 300,
    "presentation_send_statistics": 0,
    "id": "C_2025052310",
    "actor": "Ellie",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 1560,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 1100,
    "video_send_statistics": 200,
    "presentation_send_statistics": 200,
    "id": "C_2025052310",
    "actor": "Carina",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 1560,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 600,
    "video_send_statistics": 600,
    "presentation_send_statistics": 260,
    "id": "C_2025052310",
    "actor": "Chuck",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  }
]

interface ParticipantActivityTimelineProps {
  data?: any[]; // ayrıntılı tip gerekirse genişletilebilir
}

const ParticipantActivityTimeline: FC<ParticipantActivityTimelineProps> = ({ data = activityData }) => {
  // -------------------- CONST -------------------- //
  const COLORS = {
    audio: "#3B82F6", // blue-600
    video: "#79ac3fff", // violet-500
    presentation: "#F59E0B", // amber-500
  } as const;

  // Benzersiz conference_id listesi
  const conferenceIds: string[] = useMemo(
    () => Array.from(new Set((data || []).map((d: any) => d.conference_id))).sort(),
    [data]
  );

  // Seçili konferans (ilkini varsayalım)
  const [selectedId, setSelectedId] = useState<string>(conferenceIds[0] || "");

  // Konferans değişince filtrelenmiş veri
  const filteredData = useMemo(
    () => (selectedId ? data.filter((d: any) => d.conference_id === selectedId) : []),
    [data, selectedId]
  );

  const participants = filteredData.map((d: any) => d.actor);
  const meetingDuration = Math.max(...filteredData.map((d: any) => d.duration || 0), 0);

  // -------------------- SERIES -------------------- //
  // Grouped bar: each participant has three bars (audio, video, presentation)
  const audioSeries = {
    name: "Audio",
    type: "bar",
    itemStyle: { color: COLORS.audio },
    emphasis: { focus: "series" },
    data: filteredData.map((d: any) => d.audio_statistics || 0),
  };

  const videoSeries = {
    name: "Video",
    type: "bar",
    itemStyle: { color: COLORS.video },
    emphasis: { focus: "series" },
    data: filteredData.map((d: any) => d.video_send_statistics || 0),
  };

  const presentationSeries = {
    name: "Presentation",
    type: "bar",
    itemStyle: { color: COLORS.presentation },
    emphasis: { focus: "series" },
    data: filteredData.map((d: any) => d.presentation_send_statistics || 0),
  };

  // -------------------- OPTION -------------------- //
  const option: any = {
    backgroundColor: "transparent",
    title: {
      text: "Toplantı Katılımcı Aktivite Çizelgesi",
      left: "center",
      textStyle: { color: "#1f2937", fontSize: 16 },
      subtext: selectedId ? `Konferans: ${selectedId}` : undefined,
      subtextStyle: { color: "#4b5563", fontSize: 12 },
    },
    grid: {
      left: "3%",
      right: "3%",
      top: 80,
      bottom: 40,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any[]) => {
        if (!params?.length) return "";
        const idx = params[0].dataIndex;
        const row = filteredData[idx] || {};
        const { actor, audio_statistics = 0, video_send_statistics = 0, presentation_send_statistics = 0 } = row;
        const formatSec = (val: number) => {
          const h = Math.floor(val / 3600);
          const m = Math.floor((val % 3600) / 60);
          const s = val % 60;
          return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
        };
        return `
          <div style='font-size:14px;font-weight:600;margin-bottom:6px;'>${actor}</div>
          <div style='display:flex;align-items:center;margin-bottom:4px;'><span style='display:inline-block;width:10px;height:10px;background:${COLORS.audio};border-radius:2px;margin-right:6px;'></span>Audio: <b style='margin-left:4px;'>${formatSec(audio_statistics)}</b></div>
          <div style='display:flex;align-items:center;margin-bottom:4px;'><span style='display:inline-block;width:10px;height:10px;background:${COLORS.video};border-radius:2px;margin-right:6px;'></span>Video: <b style='margin-left:4px;'>${formatSec(video_send_statistics)}</b></div>
          <div style='display:flex;align-items:center;'><span style='display:inline-block;width:10px;height:10px;background:${COLORS.presentation};border-radius:2px;margin-right:6px;'></span>Presentation: <b style='margin-left:4px;'>${formatSec(presentation_send_statistics)}</b></div>
        `;
      },
    },
    legend: {
      data: [
        { name: "Audio", itemStyle: { color: COLORS.audio } },
        { name: "Video", itemStyle: { color: COLORS.video } },
        { name: "Presentation", itemStyle: { color: COLORS.presentation } },
      ],
      top: 50,
      textStyle: { color: "#374151" },
    },
    xAxis: {
      type: "value",
      min: 0,
      max: meetingDuration,
      name: "Süre",
      axisLine: { lineStyle: { color: "#d1d5db" } },
      axisLabel: {
        color: "#374151",
        formatter: (value: number) => {
          const h = Math.floor(value / 3600);
          const m = Math.floor((value % 3600) / 60);
          const s = value % 60;
          return [h, m, s]
            .map((v) => v.toString().padStart(2, '0'))
            .join(':');
        },
      },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "category",
      data: participants,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#374151", fontSize: 12 },
    },
    series: [audioSeries, videoSeries, presentationSeries],
  };

  // -------------------- RENDER -------------------- //
  return (
    <div>
      {/* Konferans seçici */}
      {conferenceIds.length > 1 && (
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="conf-select" className="text-sm text-black">
            Konferans:
          </label>
          <select
            id="conf-select"
            className="text-sm rounded px-2 py-1 border"
            value={selectedId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedId(e.target.value)}
          >
            {conferenceIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Grafik */}
      {filteredData.length ? (
        <ReactECharts
          option={option}
          style={{ width: "100%", height: 500 }}
          opts={{ renderer: "canvas" }}
        />
      ) : (
        <div className="text-gray-400 text-center py-20">Seçilen konferans için veri bulunamadı.</div>
      )}
    </div>
  );
};

export default ParticipantActivityTimeline;
