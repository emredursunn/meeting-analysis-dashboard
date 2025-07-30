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

interface PairwiseTalk { [name: string]: number; }
interface ParticipantData {
  pairwise_talk: PairwiseTalk;
  monologue_rate: number;
}

const rawData: Record<string, ParticipantData> = {
  Norman: {
    pairwise_talk: {
      "Agent Walker": 48,
      "Chuck Bartowski": 15,
      "John Casey": 10,
      "Orion": 12,
      others: 15,
    },
    monologue_rate: 22,
  },
  "Agent Walker": {
    pairwise_talk: {
      Norman: 50,
      "Chuck Bartowski": 20,
      "John Casey": 10,
      "Orion": 10,
      others: 10,
    },
    monologue_rate: 30,
  },
  "Chuck Bartowski": {
    pairwise_talk: {
      Norman: 20,
      "Agent Walker": 15,
      "John Casey": 5,
      "Orion": 5,
      others: 5,
    },
    monologue_rate: 35,
  },
  "John Casey": {
    pairwise_talk: {
      Norman: 12,
      "Agent Walker": 10,
      "Chuck Bartowski": 8,
      "Orion": 5,
      others: 5,
    },
    monologue_rate: 28,
  },
  "Orion": {
    pairwise_talk: {
      Norman: 14,
      "Agent Walker": 10,
      "Chuck Bartowski": 6,
      "John Casey": 5,
      others: 5,
    },
    monologue_rate: 25,
  },
};

/**
 * Build data for ECharts heat‑map (lower‑triangle + diagonal).
 * Off‑diagonal value is the average of both directions when present.
 */
function buildHeatmapData(data: Record<string, ParticipantData>) {
  const names = Object.keys(data);
  const matrix: { value: [number, number, number]; itemStyle?: any }[] = [];

  names.forEach((rowName, rowIdx) => {
    names.forEach((colName, colIdx) => {
      if (rowIdx === colIdx) {
        // Diagonal – monologue
        matrix.push({
          value: [colIdx, rowIdx, data[rowName].monologue_rate],
          itemStyle: { color: "#4b5563" }, // slate-600
        });
      } else if (rowIdx > colIdx) {
        // Lower triangle – pairwise (average both directions if available)
        const v1 = data[rowName].pairwise_talk[colName];
        const v2 = data[colName].pairwise_talk[rowName];
        const avg = Math.round(((v1 ?? 0) + (v2 ?? 0)) / ((v1 != null && v2 != null) ? 2 : 1));
        matrix.push({ value: [colIdx, rowIdx, avg] });
      } else {
        // Upper triangle – invisible cell (keeps grid alignment)
        matrix.push({
          value: [colIdx, rowIdx, 0],
          itemStyle: { color: "transparent" },
        });
      }
    });
  });

  return { names, matrix };
}

const CorrelationHeatmap: React.FC = () => {
  const { names, matrix } = React.useMemo(() => buildHeatmapData(rawData), []);

  const option = React.useMemo(
    () => ({
      backgroundColor: "transparent",
      title: {
        text: "Kişiler Arası Konuşma Yoğunluğu & Monolog Oranı",
        left: "center",
        top: 16,
        textStyle: {
          color: "#f3f4f6", // zinc‑100
          fontWeight: 600,
          fontSize: 18,
        },
      },
      tooltip: {
        borderColor: "#334155", // slate‑800
        backgroundColor: "#1e293b", // slate‑900
        textStyle: { color: "#f1f5f9" },
        formatter: (params: any) => {
          const [xIdx, yIdx, val] = params.data.value;
          const row = names[yIdx];
          const col = names[xIdx];
          if (xIdx === yIdx) return `${row} → Monolog: %${val}`;
          if (yIdx > xIdx) return `${row} ↔ ${col}: %${val} iletişim`;
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
          formatter: (val: string) => val.replace(/\s+/, "\n"),
          color: "#f3f4f6",
          fontWeight: "600",
          fontSize: 12,
          lineHeight: 14,
          margin: 10,
        },
        axisLine: { lineStyle: { color: "#334155" } },
        axisTick: { show: false },
      },
      yAxis: {
        type: "category",
        data: names,
        inverse: true,
        axisLabel: {
          formatter: (val: string) => val.replace(/\s+/, "\n"),
          color: "#f3f4f6",
          fontWeight: "600",
          fontSize: 12,
          lineHeight: 14,
          margin: 10,
        },
        axisLine: { lineStyle: { color: "#334155" } },
        axisTick: { show: false },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: "vertical",
        right: 16,
        top: "middle",
        inRange: {
          color: ["#164e63", "#0e7490", "#0284c7", "#38bdf8", "#a855f7"],
        },
        textStyle: { color: "#f3f4f6" },
        borderColor: "#334155",
        backgroundColor: "#1e293b",
      },
      series: [
        {
          type: "heatmap",
          data: matrix,
          label: {
            show: true,
            formatter: ({ value }: any) => (value[2] ? `${value[2]}%` : ""),
            color: "#fff",
            fontSize: 11,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 8,
              shadowColor: "rgba(0,0,0,0.5)",
            },
          },
          itemStyle: {
            borderColor: "#1e293b",
            borderWidth: 1,
          },
        },
      ],
    }),
    [names, matrix]
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
