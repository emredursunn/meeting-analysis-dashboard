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
    "date": "2025-05-23 13:48:26",
    "meeting_code": "M_202505230",
    "conference_id": "C_202505230",
    "duration": 4335,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 2182,
    "video_send_statistics": 1381,
    "presentation_send_statistics": 0,
    "id": "C_202505230",
    "actor": "rick.baker@ago.com",
    "actor_unit": "UB",
    "actor_display_department": "SALES-DB-UB-TA"
  },
  {
    "date": "2025-05-23 13:48:26",
    "meeting_code": "M_202505230",
    "conference_id": "C_202505230",
    "duration": 6160,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 3368,
    "video_send_statistics": 1350,
    "presentation_send_statistics": 1299,
    "id": "C_202505230",
    "actor": "helena.gross@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "SALES-DB-UA"
  },
  {
    "date": "2025-05-23 18:27:52",
    "meeting_code": "M_202505231",
    "conference_id": "C_202505231",
    "duration": 4840,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 2213,
    "video_send_statistics": 1346,
    "presentation_send_statistics": 977,
    "id": "C_202505231",
    "actor": "carolina.erickson@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "SALES-DA-UA-TA"
  },
  {
    "date": "2025-05-23 18:27:52",
    "meeting_code": "M_202505231",
    "conference_id": "C_202505231",
    "duration": 2909,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 2784,
    "video_send_statistics": 0,
    "presentation_send_statistics": 0,
    "id": "C_202505231",
    "actor": "phoebe.lucas@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "SALES-DA-UA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 4719,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 1664,
    "video_send_statistics": 1961,
    "presentation_send_statistics": 841,
    "id": "C_2025052310",
    "actor": "stuart.mcdonald@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 4156,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 1835,
    "video_send_statistics": 1347,
    "presentation_send_statistics": 892,
    "id": "C_2025052310",
    "actor": "ted.shaw@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 3680,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 2323,
    "video_send_statistics": 1209,
    "presentation_send_statistics": 0,
    "id": "C_2025052310",
    "actor": "neil.campbell@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 3426,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 2137,
    "video_send_statistics": 575,
    "presentation_send_statistics": 703,
    "id": "C_2025052310",
    "actor": "orlando.gibson@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 12:40:47",
    "meeting_code": "M_2025052310",
    "conference_id": "C_2025052310",
    "duration": 5129,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 3055,
    "video_send_statistics": 1416,
    "presentation_send_statistics": 0,
    "id": "C_2025052310",
    "actor": "keith.ellis@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "IT-DA-UA-TA"
  },
  {
    "date": "2025-05-23 15:16:06",
    "meeting_code": "M_20250523100",
    "conference_id": "C_20250523100",
    "duration": 3802,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 2471,
    "video_send_statistics": 1234,
    "presentation_send_statistics": 38,
    "id": "C_20250523100",
    "actor": "marlin.woodward@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "MARKETING-DA-UA-TA"
  },
  {
    "date": "2025-05-23 15:16:06",
    "meeting_code": "M_20250523100",
    "conference_id": "C_20250523100",
    "duration": 4412,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 1718,
    "video_send_statistics": 1893,
    "presentation_send_statistics": 0,
    "id": "C_20250523100",
    "actor": "aaron.dudley@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "MARKETING-DA-UA-TA"
  },
  {
    "date": "2025-05-23 15:16:06",
    "meeting_code": "M_20250523100",
    "conference_id": "C_20250523100",
    "duration": 5882,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 3612,
    "video_send_statistics": 1391,
    "presentation_send_statistics": 0,
    "id": "C_20250523100",
    "actor": "hector.daniel@ago.com",
    "actor_unit": "UA",
    "actor_display_department": "MARKETING-DA-UA-TA"
  },
  {
    "date": "2025-05-23 15:58:27",
    "meeting_code": "M_20250523101",
    "conference_id": "C_20250523101",
    "duration": 5722,
    "country": "TR",
    "city": "İstanbul",
    "audio_statistics": 3429,
    "video_send_statistics": 1364,
    "presentation_send_statistics": 855,
    "id": "C_20250523101",
    "actor": "tommy.gonzalez@ago.com",
    "actor_unit": "UB",
    "actor_display_department": "SALES-DB-UB-TA"
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
  const audioSeries = {
    name: "Audio",
    type: "bar",
    stack: "total",
    itemStyle: { color: COLORS.audio },
    emphasis: { focus: "series" },
    data: filteredData.map((d: any) => d.audio_statistics || 0),
  };

  const videoSeries = {
    name: "Video",
    type: "bar",
    stack: "total",
    itemStyle: { color: COLORS.video },
    emphasis: { focus: "series" },
    data: filteredData.map((d: any) => d.video_send_statistics || 0),
  };

  const presentationSeries = {
    name: "Presentation",
    type: "bar",
    stack: "total",
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
      textStyle: { color: "#E5E7EB", fontSize: 16 },
      subtext: selectedId ? `Konferans: ${selectedId}` : undefined,
      subtextStyle: { color: "#9CA3AF", fontSize: 12 },
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
        return `
          <div style='font-size:14px;font-weight:600;margin-bottom:6px;'>${actor}</div>
          <div style='display:flex;align-items:center;margin-bottom:4px;'><span style='display:inline-block;width:10px;height:10px;background:${COLORS.audio};border-radius:2px;margin-right:6px;'></span>Audio: <b style='margin-left:4px;'>${audio_statistics}</b> sn</div>
          <div style='display:flex;align-items:center;margin-bottom:4px;'><span style='display:inline-block;width:10px;height:10px;background:${COLORS.video};border-radius:2px;margin-right:6px;'></span>Video: <b style='margin-left:4px;'>${video_send_statistics}</b> sn</div>
          <div style='display:flex;align-items:center;'><span style='display:inline-block;width:10px;height:10px;background:${COLORS.presentation};border-radius:2px;margin-right:6px;'></span>Presentation: <b style='margin-left:4px;'>${presentation_send_statistics}</b> sn</div>
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
      textStyle: { color: "#E5E7EB" },
    },
    xAxis: {
      type: "value",
      min: 0,
      max: meetingDuration,
      name: "Saniye",
      axisLine: { lineStyle: { color: "#6B7280" } },
      axisLabel: { color: "#E5E7EB" },
      splitLine: { lineStyle: { color: "#374151" } },
    },
    yAxis: {
      type: "category",
      data: participants,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#E5E7EB", fontSize: 12 },
    },
    series: [audioSeries, videoSeries, presentationSeries],
  };

  // -------------------- RENDER -------------------- //
  return (
    <div>
      {/* Konferans seçici */}
      {conferenceIds.length > 1 && (
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="conf-select" className="text-sm text-gray-300">
            Konferans:
          </label>
          <select
            id="conf-select"
            className="bg-gray-800 text-gray-100 text-sm rounded px-2 py-1 border border-gray-600"
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
