import React from "react";
import ReactECharts from "echarts-for-react";

// Demo / fallback data
const defaultTimeline = [
  {
    start: 1.58,
    end: 2.09,
    text: "Canım buray.",
    strong_emotions: {
      Happiness: 0.47944517063442615,
      Anger: 0.3291296540759504,
      Calmness: 0.35897625265643,
    },
  },
  {
    start: 3.41,
    end: 3.49,
    text: "Gidin.",
    strong_emotions: {
      Happiness: 0.32546544368378816,
      Fear: 0.2584711220115423,
      Anger: 0.2100514588644728,
    },
  },
  {
    start: 5.13,
    end: 6.4,
    text: "Oğlum bu kadar da bağırılmaz ya.",
    strong_emotions: {
      Happiness: 0.2727973090484738,
      Calmness: 0.7027271468192339,
      Fear: 0.2327978298068047,
    },
  },
  {
    start: 7.56,
    end: 7.88,
    text: "Emiri.",
    strong_emotions: {
      Happiness: 0.3014392246492207,
      Fear: 0.34243450630456207,
      Calmness: 0.3313961551524699,
    },
  },
  {
    start: 9.76,
    end: 10.91,
    text: "Hilmi ne yapıyorsun sen ya?",
    strong_emotions: {
      Sadness: 0.4842788858804852,
      Disgust: 0.2112400306854397,
      Anger: 0.8643424614332617,
    },
  },
];

const EmotionTimelineAreaChart = ({ data = defaultTimeline, height = 500 }) => {
  const EMOTION_COLORS :any= {
    Happiness: "#FACC15",
    Anger: "#EF4444",
    Calmness: "#10B981",
    Fear: "#2563EB",
    Sadness: "#6366F1",
    Disgust: "#A855F7",
  };

  const timeline = [...data].sort((a, b) => a.start - b.start);
  if (!timeline.length) return null;

  const emotions = Object.keys(EMOTION_COLORS).filter((e) =>
    timeline.some((t:any) => (t.strong_emotions[e] ?? 0) > 0)
  );

  // Her segment için emotion değerlerini topla ve sırala
  const segmentEmotions = timeline.map(segment => {
    const emotionValues = Object.entries(segment.strong_emotions)
      .filter(([emotion, value]) => emotions.includes(emotion) && value > 0)
      .sort((a, b) => b[1] - a[1]); // Büyükten küçüğe sırala
    
    return {
      ...segment,
      sortedEmotions: emotionValues
    };
  });

  // Build Series - basit yaklaşım, doğru sıralama ile
  const seriesData :any= {};
  emotions.forEach((e) => {
    seriesData[e] = [];
  });

  segmentEmotions.forEach(({ start, end, strong_emotions }) => {
    const q1 = start + (end - start) * 0.25;
    const mid = (start + end) / 2;
    const q3 = start + (end - start) * 0.75;
    
    Object.entries(strong_emotions).forEach(([emo, val]) => {
      if (!seriesData[emo] || val <= 0) return;
      const shoulder = val * 0.3;
      const arr = seriesData[emo];
      arr.push([start, 0], [q1, shoulder], [mid, val], [q3, shoulder], [end, 0]);
    });
  });

  // Genel maksimum değerlere göre sırala - küçükten büyüğe (küçük üstte, büyük altta)
  const maxValues :any = {};
  emotions.forEach(emo => {
    maxValues[emo] = Math.max(...timeline.map((t:any) => t.strong_emotions[emo] || 0));
  });

  const series = emotions.map((emo) => {
    return {
      name: emo,
      type: "line",
      data: seriesData[emo],
      smooth: 0.4,
      showSymbol: false,
      lineStyle: { 
        width: 3, 
        color: EMOTION_COLORS[emo],
        opacity: 1
      },
      // Area chart yerine sadece line kullan
      emphasis: { focus: "series" },
      connectNulls: false,
    };
  });

  const tooltipFormatter = (params:any) => {
    if (!params?.length) return "";
    const xVal = params[0].value[0];
    const seg = timeline.find((s) => xVal >= s.start && xVal <= s.end);
    if (!seg) return "";
    
    const lines = params
      .filter((p:any) => p.value && p.value[1] > 0)
      .sort((a:any, b:any) => b.value[1] - a.value[1])
      .map(
        (p:any) =>
          `<span style='display:inline-block;width:10px;height:10px;background:${EMOTION_COLORS[p.seriesName]};margin-right:6px;border-radius:2px;'></span>${p.seriesName}: <b>${(+p.value[1]).toFixed(3)}</b>`
      )
      .join("<br/>");
    
    return `<div style='font-size:12px;font-weight:600;margin-bottom:6px;color:#fff;'>"${seg.text}"</div>
            <div style='font-size:11px;margin-bottom:4px;color:#ccc;'>Zaman: ${seg.start.toFixed(1)}s - ${seg.end.toFixed(1)}s</div>
            ${lines}`;
  };

  const option = {
    backgroundColor: "transparent",
    title: {
      text: "Konuşma Sırasında Oluşan Duygular (Zaman Serisi)",
      left: "center",
      textStyle: { color: "#E5E7EB", fontSize: 16, fontWeight: "bold" },
    },
    legend: {
      data: emotions.map((e) => ({ 
        name: e, 
        icon: "roundRect", 
        itemStyle: { color: EMOTION_COLORS[e] } 
      })),
      top: 35,
      itemWidth: 18,
      itemHeight: 12,
      itemGap: 16,
      textStyle: { color: "#F3F4F6", fontSize: 12 },
      selectedMode: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { 
        type: "cross", 
        snap: true,
        crossStyle: {
          color: "#999"
        }
      },
      formatter: tooltipFormatter,
      backgroundColor: "rgba(0,0,0,0.8)",
      borderColor: "#666",
      textStyle: {
        color: "#fff"
      }
    },
    grid: { 
      left: "8%", 
      right: "8%", 
      top: 80, 
      bottom: 80, 
      containLabel: true 
    },
    xAxis: {
      type: "value",
      min: timeline[0].start - 0.5,
      max: timeline[timeline.length - 1].end + 0.5,
      name: "Zaman (Saniye)",
      nameLocation: "middle",
      nameGap: 25,
      nameTextStyle: { color: "#9CA3AF", fontSize: 11 },
      axisLabel: { 
        color: "#9CA3AF", 
        fontSize: 10,
        formatter: (value:any) => value.toFixed(1) + "s"
      },
      axisLine: { lineStyle: { color: "#6B7280" } },
      splitLine: { show: true, lineStyle: { color: "#374151", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1,
      name: "Duygu Yoğunluğu",
      nameLocation: "middle",
      nameGap: 35,
      nameTextStyle: { color: "#9CA3AF", fontSize: 11 },
      axisLabel: { 
        color: "#9CA3AF", 
        fontSize: 10,
        formatter: (value:any) => value.toFixed(1)
      },
      splitLine: { lineStyle: { color: "#374151" } },
    },
    series,
    dataZoom: [
      { 
        type: "inside", 
        xAxisIndex: 0, 
        filterMode: "none", 
        throttle: 50 
      },
      {
        type: "slider",
        xAxisIndex: 0,
        height: 20,
        bottom: 25,
        handleSize: 14,
        handleStyle: { color: "#9CA3AF" },
        borderColor: "#4B5563",
        fillerColor: "rgba(156, 163, 175, 0.2)",
        textStyle: { color: "#9CA3AF", fontSize: 10 },
        brushSelect: false,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height, background: "transparent" }}>
      <ReactECharts 
        option={option} 
        style={{ width: "100%", height: "100%" }} 
        opts={{ renderer: "canvas" }} 
      />
    </div>
  );
};

export default EmotionTimelineAreaChart;