"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

/**
 * Correlation / Monologue heat‑map for a dark dashboard – v3
 * ---------------------------------------------------------
 * • Lower‑triangle + diagonal only.
 * • Cool blue → fuchsia palette on dark bg.
 * • **X‑axis _ve_ Y‑axis etiketleri** ilk boşlukta kırılarak iki satır
 *   hâline geliyor; böylece uzun isimler asla taşmıyor.
 * • Sol kenar genişletildi (grid.left) ki çok satırlı Y‑etiketleri rahat sığsın.
 */


// interface ParticipantData {
//   pairwise_talk: PairwiseTalk;
//   monologue_rate: number;
// }

// Yeni veri (örnek olarak hardcoded, gerçek kullanımda dışarıdan alınabilir)
interface ParticipantDialogue {
  [name: string]: string; // participant name -> duration string
}
interface ParticipantRawDatum {
  name: string;
  dialogue_durations: ParticipantDialogue;
  monologue_duration: string;
}

const participantRawData: ParticipantRawDatum[] = [
  {
    name: "Guney Ozturk",
    dialogue_durations: {
      "Muhammed Sefa Sözer": "00:01:35",
      "Emre": "00:03:20",
      "Hilmi Tunahan AHLATÇI": "00:01:15",
      "Selin Üzeyiroğlu": "00:01:30",
      "Burhan Ok": "00:04:30",
      "Guney Ozturk": "00:00:00"
    },
    monologue_duration: "00:14:30"
  },
  {
    name: "Muhammed Sefa Sözer",
    dialogue_durations: {
      "Guney Ozturk": "00:01:35",
      "Burhan Ok": "00:01:30",
      "Emre": "00:00:00",
      "Hilmi Tunahan AHLATÇI": "00:00:00",
      "Selin Üzeyiroğlu": "00:00:00",
      "Muhammed Sefa Sözer": "00:00:00"

    },
    monologue_duration: "00:05:30"
  },
  {
    name: "Emre",
    dialogue_durations: {
      "Guney Ozturk": "00:03:20",
      "Muhammed Sefa Sözer": "00:00:00",
      "Hilmi Tunahan AHLATÇI": "00:00:00",
      "Selin Üzeyiroğlu": "00:00:00",
      "Burhan Ok": "00:00:00",
      "Emre": "00:00:00"
    },
    monologue_duration: "00:02:30"
  },
  {
    name: "Hilmi Tunahan AHLATÇI",
    dialogue_durations: {
      "Guney Ozturk": "00:01:15",
      "Muhammed Sefa Sözer": "00:00:00",
      "Emre": "00:00:00",
      "Selin Üzeyiroğlu": "00:00:00",
      "Burhan Ok": "00:00:00",
      "Hilmi Tunahan AHLATÇI": "00:00:00"
    },
    monologue_duration: "00:01:40"
  },
  {
    name: "Selin Üzeyiroğlu",
    dialogue_durations: {
      "Guney Ozturk": "00:01:30",
      "Muhammed Sefa Sözer": "00:00:00",
      "Emre": "00:00:00",
      "Hilmi Tunahan AHLATÇI": "00:00:00",
      "Burhan Ok": "00:00:00",
      "Selin Üzeyiroğlu": "00:00:00"
    },
    monologue_duration: "00:02:30"
  },
  {
    name: "Burhan Ok",
    dialogue_durations: {
      "Guney Ozturk": "00:04:30",
      "Muhammed Sefa Sözer": "00:01:30",
      "Emre": "00:00:00",
      "Hilmi Tunahan AHLATÇI": "00:00:00",
      "Selin Üzeyiroğlu": "00:00:00",
      "Burhan Ok": "00:00:00"
    },
    monologue_duration: "00:02:00"
  }
];


/**
 * Build heatmap data from participantRawData (durations in seconds).
 */
function parseDuration(str: string): number {
  // "HH:MM:SS" or "MM:SS"
  const parts = str.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}
function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
function buildHeatmapData(participants: ParticipantRawDatum[]) {
  const names = participants.map((p) => p.name);
  const matrix: { value: [number, number, number]; itemStyle?: any }[] = [];
  let maxVal = 0;
  names.forEach((rowName, rowIdx) => {
    names.forEach((colName, colIdx) => {
      const rowP = participants.find((p) => p.name === rowName);
      const colP = participants.find((p) => p.name === colName);
      if (rowIdx === colIdx) {
        // Diagonal – monologue
        const monoSec = rowP ? parseDuration(rowP.monologue_duration) : 0;
        if (monoSec > maxVal) maxVal = monoSec;
        matrix.push({
          value: [colIdx, rowIdx, monoSec],
          itemStyle: { color: "#4b5563" },
        });
      } else if (rowIdx > colIdx) {
        // Lower triangle – pairwise (sum both directions if available)
        const v1 = rowP?.dialogue_durations?.[colName];
        const v2 = colP?.dialogue_durations?.[rowName];
        const sec1 = v1 ? parseDuration(v1) : 0;
        const sec2 = v2 ? parseDuration(v2) : 0;
        const total = sec1 + sec2;
        if (total > maxVal) maxVal = total;
        matrix.push({ value: [colIdx, rowIdx, total] });
      } else {
        // Upper triangle – invisible cell (keeps grid alignment)
        matrix.push({
          value: [colIdx, rowIdx, 0],
          itemStyle: { color: "transparent" },
        });
      }
    });
  });
  return { names, matrix, maxVal };
}

const CorrelationHeatmap: React.FC = () => {
  const { names, matrix, maxVal } = React.useMemo(() => buildHeatmapData(participantRawData), []);

  const option = React.useMemo(
    () => ({
      backgroundColor: "transparent",
      title: {
        // text: "Kişiler Arası Konuşma Yoğunluğu & Monolog Oranı",
        text:"",
        left: "center",
        top: 16,
        textStyle: {
          color: "#1f2937",
          fontWeight: 600,
          fontSize: 18,
        },
      },
      tooltip: {
        borderColor: "#d1d5db",
        backgroundColor: "#ffffff",
        textStyle: { color: "#1f2937" },
        formatter: (params: any) => {
          const [xIdx, yIdx, val] = params.data.value;
          const row = names[yIdx];
          const col = names[xIdx];
          if (xIdx === yIdx) return `${row} → Monolog: ${formatDuration(val)}`;
          if (yIdx > xIdx) return `${row} ↔ ${col}: ${formatDuration(val)}`;
          return ""; // hidden upper‑triangle cells
        },
      },
      grid: {
        left: 160,   // widened for multi‑line Y labels
        right: 120,
        top: 80,
        bottom: 100, // room for multi‑line X labels
      },
      xAxis: {
        type: "category",
        data: names,
        axisLabel: {
          // İsimleri eğik ve tek satırda, sığması için döndürülmüş
          formatter: (val: string) => val,
          color: "#1f2937",
          fontWeight: "600",
          fontSize: 12,
          margin: 10,
          rotate: 40, // isimleri eğik yap
          fontStyle: "italic", // italik yazı
          overflow: "truncate", // sığmazsa kes
        },
        axisLine: { lineStyle: { color: "#ffffff" } },
        axisTick: { show: false },
      },
      yAxis: {
        type: "category",
        data: names,
        inverse: true,
        axisLabel: {
          formatter: (val: string) => val.replace(/\s+/, "\n"),
          color: "#1f2937",
          fontWeight: "600",
          fontSize: 12,
          lineHeight: 14,
          fontStyle: "italic", // italik yazı
          margin: 10,
        },
        axisLine: { lineStyle: { color: "#ffffff" } },
        axisTick: { show: false },
      },
      visualMap: {
        min: 0,
        max: maxVal,
        calculable: true,
        orient: "vertical",
        right: 16,
        top: "middle",
        inRange: {
          color: ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#1e40af"],
        },
        text: ["Uzun", "Kısa"],
        textStyle: { color: "#1f2937" , fontWeight: "900" },
        borderColor: "#ffffff",
        backgroundColor: "#ffffff",
        formatter: (val: number) => formatDuration(val),
      },
      series: [
        {
          type: "heatmap",
          data: matrix,
          label: {
            show: true,
            formatter: function({ value }: any) {
  const [xIdx, yIdx] = value;
  if (yIdx >= xIdx) return formatDuration(value[2]);
  return "";
},
            color: "#1f2937",
            fontSize: 11,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 8,
              shadowColor: "rgba(0,0,0,0.5)",
            },
          },
          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 1,
          },
        },
      ],
    }),
    [names, matrix, maxVal]
  );

  return (
    <ReactECharts
      option={option}
      style={{ height: 600, width: "100%" }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default CorrelationHeatmap;
