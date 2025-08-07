import React from "react";
import ReactECharts from "echarts-for-react";

// Demo / fallback data (şayet props ile geçilmezse)
import basicEmotion from '../data/basic_emotion.json';

const defaultTimeline = basicEmotion as any[];

const EmotionTimelineAreaChart = ({ data = defaultTimeline, height = 500 }) => {
  // English emotion-color mapping
  const EMOTION_COLORS = {
    Calmness: "#10B981",
    Determination: "#F59E0B",
    Confusion: "#6366F1",
    Interest: "#3B82F6",
    Amusement: "#EC4899",
    Joy: "#FACC15",
    Anger: "#EF4444",
    Excitement: "#8B5CF6",
    Distress: "#DC2626",
    Boredom: "#9CA3AF",
    Disappointment: "#F97316",
    Sadness: "#3F3F46",
    Doubt: "#64748B",
    // İhtiyaç halinde yeni duyguları buraya ekleyin
  };

  // Zaman dilimlerine göre sırala
  const timeline = [...data].sort((a, b) => a.start - b.start);
  if (!timeline.length) return null;

  // Grafikte göstereceğimiz duyguları filtrele
  const emotions = Object.keys(EMOTION_COLORS).filter(
    (emo) => timeline.some((seg:any) => (seg.strong_emotions?.[emo] ?? 0) > 0)
  );

  // Her segment için duyguları sırala
  const segmentEmotions = timeline.map((segment) => {
    const sorted = Object.entries(segment.strong_emotions || {})
      .filter(([emo, val]) => emotions.includes(emo) && (val as number) > 0)
      .sort((a, b) => (b[1] as number) - (a[1] as number));
    return { ...segment, sortedEmotions: sorted };
  });

  // Series için veri hazırlığı
  const seriesData = {};
  emotions.forEach((emo) => (seriesData[emo] = []));

  segmentEmotions.forEach(({ start, end, strong_emotions }) => {
    const q1 = start + (end - start) * 0.25;
    const mid = (start + end) / 2;
    const q3 = start + (end - start) * 0.75;

    Object.entries(strong_emotions || {}).forEach(([emo, val]) => {
      const value = val as number;
      if (!seriesData[emo] || value <= 0) return;
      const shoulder = value * 0.3;
      seriesData[emo].push(
        [start, 0],
        [q1, shoulder],
        [mid, value],
        [q3, shoulder],
        [end, 0]
      );
    });
  });

  const series = emotions.map((emo) => ({
    name: emo,
    type: "line",
    data: seriesData[emo],
    smooth: 0.4,
    showSymbol: false,
    lineStyle: { width: 3, color: EMOTION_COLORS[emo], opacity: 1 },
    emphasis: { focus: "series" },
    connectNulls: false,
    areaStyle: {} // Doldurmalı alan çizimi için
  }));

  // Tooltip özelleştirme
  const tooltipFormatter = (params:any) => {
    if (!params.length) return "";
    const xVal = params[0].value[0];
    const seg = timeline.find((s:any) => xVal >= s.start && xVal <= s.end);
    if (!seg) return "";

    const lines = params
      .filter((p:any) => p.value && p.value[1] > 0)
      .sort((a:any, b:any) => b.value[1] - a.value[1])
      .map((p:any) => {
        const name = p.seriesName;
        return `<span style='display:inline-block;width:10px;height:10px;background:${EMOTION_COLORS[name]};margin-right:6px;border-radius:2px;'></span>${name}: <b>${(+p.value[1]).toFixed(3)}</b>`;
      })
      .join("<br/>");

    return `
      <div style='font-size:12px;font-weight:600;margin-bottom:6px;color:#1f2937;'>Segment</div>
      <div style='font-size:11px;margin-bottom:4px;color:#4b5563;'>Time: ${seg.start.toFixed(1)}s - ${seg.end.toFixed(1)}s</div>
      ${lines}
    `;
  };

  // ECharts option
  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Konuşma Duygu Zaman Serisi",
      left: "center",
      textStyle: { color: "#1f2937", fontSize: 16, fontWeight: "bold" }
    },
    legend: {
      data: emotions,
      top: 35,
      itemWidth: 18,
      itemHeight: 12,
      itemGap: 16,
      textStyle: { color: "#374151", fontSize: 12 },
      selectedMode: true
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross", snap: true },
      formatter: tooltipFormatter,
      backgroundColor: "rgba(255,255,255,0.9)",
      borderColor: "#ccc",
      textStyle: { color: "#1f2937" }
    },
    grid: { left: "8%", right: "8%", top: 80, bottom: 80, containLabel: true },
    xAxis: {
      type: "value",
      min: timeline[0].start - 0.5,
      max: timeline[timeline.length - 1].end + 0.5,
      name: "Zaman (s)",
      nameLocation: "middle",
      nameGap: 25,
      nameTextStyle: { color: "#4b5563", fontSize: 11 },
      axisLabel: { color: "#4b5563", fontSize: 10, formatter: (v) => v.toFixed(1) + "s" },
      axisLine: { lineStyle: { color: "#d1d5db" } },
      splitLine: { show: true, lineStyle: { color: "#e5e7eb", type: "dotted" } }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1,
      name: "Duygu Yoğunluğu",
      nameLocation: "middle",
      nameGap: 35,
      nameTextStyle: { color: "#4b5563", fontSize: 11 },
      axisLabel: { color: "#4b5563", fontSize: 10, formatter: (v) => v.toFixed(1) },
      splitLine: { lineStyle: { color: "#e5e7eb" } }
    },
    series,
    dataZoom: [
      { type: "inside", xAxisIndex: 0, filterMode: "none", throttle: 50 },
      { type: "slider", xAxisIndex: 0, height: 20, bottom: 25, handleSize: 14, handleStyle: { color: "#4b5563" }, borderColor: "#d1d5db", fillerColor: "rgba(156, 163, 175, 0.2)", textStyle: { color: "#4b5563", fontSize: 10 } }
    ]
  };

  return (
    <div style={{ width: "100%", height, background: "transparent" }}>
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} opts={{ renderer: "canvas" }} />
    </div>
  );
};

export default EmotionTimelineAreaChart;
