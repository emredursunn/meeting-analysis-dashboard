import ReactECharts from 'echarts-for-react';

const topicEmotionData: any = {
  "topics": [
    {
      "topic": "Intro & Task Distribution",
      "start_sec": 3,
      "end_sec": 49,
      "persons": {
        "Agent Walker": {
          "Neutral": 69.52,
          "Happiness": 23.36,
          "Stress": 0.0,
          "Sadness": 0.18,
          "Anger": 0.0,
          "Surprise": 6.22
        },
        "John Casey": {
          "Neutral": 67.16,
          "Happiness": 25.76,
          "Stress": 0.0,
          "Sadness": 2.81,
          "Anger": 0.0,
          "Surprise": 4.27
        },
        "Chuck Bartowski": {
          "Neutral": 24.23,
          "Happiness": 32.67,
          "Stress": 21.0,
          "Sadness": 18.61,
          "Anger": 3.5,
          "Surprise": 0.0
        },
        "Ellie": {
          "Neutral": 81.7,
          "Happiness": 12.24,
          "Stress": 0.0,
          "Sadness": 4.21,
          "Anger": 0.0,
          "Surprise": 1.51
        },
        "Carina": {
          "Neutral": 70.42,
          "Happiness": 21.83,
          "Stress": 0.0,
          "Sadness": 5.08,
          "Anger": 0.0,
          "Surprise": 2.07
        },
        "Jeffrey": {
          "Neutral": 37.48,
          "Happiness": 18.07,
          "Stress": 24.5,
          "Sadness": 7.0,
          "Anger": 10.5,
          "Surprise": 2.45
        }
      }
    },
    {
      "topic": "Technical Details",
      "start_sec": 49,
      "end_sec": 225,
      "persons": {
        "Agent Walker": {
          "Neutral": 69.52,
          "Happiness": 23.36,
          "Stress": 0.0,
          "Sadness": 0.18,
          "Anger": 0.0,
          "Surprise": 6.22
        },
        "John Casey": {
          "Neutral": 67.16,
          "Happiness": 25.76,
          "Stress": 0.0,
          "Sadness": 2.81,
          "Anger": 0.0,
          "Surprise": 4.27
        },
        "Chuck Bartowski": {
          "Neutral": 20.73,
          "Happiness": 22.17,
          "Stress": 28.0,
          "Sadness": 25.61,
          "Anger": 3.5,
          "Surprise": 0.0
        },
        "Ellie": {
          "Neutral": 81.7,
          "Happiness": 12.24,
          "Stress": 0.0,
          "Sadness": 4.21,
          "Anger": 0.0,
          "Surprise": 1.51
        },
        "Carina": {
          "Neutral": 70.42,
          "Happiness": 21.83,
          "Stress": 0.0,
          "Sadness": 5.08,
          "Anger": 0.0,
          "Surprise": 2.07
        },
        "Jeffrey": {
          "Neutral": 30.48,
          "Happiness": 7.57,
          "Stress": 42.0,
          "Sadness": 10.5,
          "Anger": 7.0,
          "Surprise": 2.45
        }
      }
    },
    {
      "topic": "Client Concerns & Deadlines",
      "start_sec": 225,
      "end_sec": 368,
      "persons": {
        "Agent Walker": {
          "Neutral": 69.52,
          "Happiness": 23.36,
          "Stress": 0.0,
          "Sadness": 0.18,
          "Anger": 0.0,
          "Surprise": 6.22
        },
        "John Casey": {
          "Neutral": 67.16,
          "Happiness": 25.76,
          "Stress": 0.0,
          "Sadness": 2.81,
          "Anger": 0.0,
          "Surprise": 4.27
        },
        "Chuck Bartowski": {
          "Neutral": 20.73,
          "Happiness": 25.67,
          "Stress": 21.0,
          "Sadness": 29.11,
          "Anger": 3.5,
          "Surprise": 0.0
        },
        "Ellie": {
          "Neutral": 81.7,
          "Happiness": 12.24,
          "Stress": 0.0,
          "Sadness": 4.21,
          "Anger": 0.0,
          "Surprise": 1.51
        },
        "Carina": {
          "Neutral": 70.42,
          "Happiness": 21.83,
          "Stress": 0.0,
          "Sadness": 5.08,
          "Anger": 0.0,
          "Surprise": 2.07
        },
        "Jeffrey": {
          "Neutral": 30.48,
          "Happiness": 11.07,
          "Stress": 31.5,
          "Sadness": 10.5,
          "Anger": 14.0,
          "Surprise": 2.45
        }
      }
    }
  ]
};


/**
 * EmotionTopicBarChart
 *  - Kişi legend'i artık kişiyi pasifleştirince tüm barlarını gizler.
 *  - Sağdaki sabit duygu renk haritası geri getirildi (ECharts dışı).
 */
const EmotionTopicBarChart = () => {
  // -------------------- COLOR PALETTE -------------------- //
  const emotionColors: any = {
    Neutral: "#A0AEC0", // gray
    Happiness: "#FBBF24", // amber
    Stress: "#EF4444", // red
    Anger: "#991B1B", // dark red
    Fear: "#2563EB", // blue
    Sadness: "#6366F1", // indigo
    Surprise: "#14B8A6", // teal
  };

  const topics: any = topicEmotionData.topics.map((t: any) => t.topic);
  const persons: any = Array.from(
    new Set(topicEmotionData.topics.flatMap((t: any) => Object.keys(t.persons)))
  );
  const allEmotions: any = Object.keys(emotionColors);

  const personColors: any = {
    "Agent Walker": "#0c6904ff",
    "Chuck Bartowski": "#0c6904ff",
    "John Casey": "#0c6904ff",
    "Orion": "#0c6904ff",
    "Ellie": "#0c6904ff",
    "Carina": "#0c6904ff",
    "Jeffrey": "#0c6904ff",
  };

  // -------------------- SERIES -------------------- //
  const series: any = [];
  persons.forEach((person: any) => {
    allEmotions.forEach((emotion: any) => {
      series.push({
        name: person,
        id: `${person}-${emotion}`,
        type: "bar",
        stack: person,
        itemStyle: { color: emotionColors[emotion] },
        emphasis: { focus: "series" },
        data: topics.map((topicName: any) => {
          const topicData = topicEmotionData.topics.find((t: any) => t.topic === topicName);
          return topicData?.persons[person]?.[emotion] || 0;
        }),
      });
    });

    series.push({
      name: person,
      id: `${person}-label`,
      type: "bar",
      stack: person,
      silent: true,
      itemStyle: { color: "transparent" },
      data: topics.map(() => 0),
      label: {
        show: true,
        formatter: () => person.split(" ")[0],
        position: "top",
        color: "#374151",
        fontSize: 12,
        distance: 10,
        textBorderColor: "#ffffff",
        textBorderWidth: 2,
        rotate: 45, // Çapraz gösterim
        overflow: 'break',
      },
    });
  });

  // -------------------- OPTION -------------------- //
  const option: any = {
    backgroundColor: "transparent",
    title: {
      text: "Konuya Göre Kişi • Duygu Dağılımı",
      left: "center",
      textStyle: { color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      axisPointer: { type: "shadow" },
      formatter: (param: any) => {
        const person = param.seriesName;
        const topicName = param.name;
        const topicData = topicEmotionData.topics.find((t: any) => t.topic === topicName);
        if (!topicData || !topicData.persons[person]) return "";

        const personEmotions = topicData.persons[person];
        let html = `<div style='font-size:14px;font-weight:600;margin-bottom:6px;'>${topicName}</div>`;
        html += `<div style='font-size:13px;font-weight:600;margin-bottom:6px;border-top:1px solid #333;padding-top:6px;'>${person}</div>`;

        Object.entries(personEmotions)
          .filter(([, v]) => v as any > 0)
          .sort(([, a], [, b]) => (b as any) - (a as any))
          .forEach(([emo, v]) => {
            html += `<div style=\"display:flex;align-items:center;margin-bottom:4px;\">
              <span style=\"display:inline-block;width:10px;height:10px;background:${emotionColors[emo]};border-radius:2px;margin-right:6px;\"></span>
              <span style=\"flex:1;\">${emo}</span>
              <span style=\"font-weight:600;\">${(v as any).toFixed(1)}</span>
            </div>`;
          });
        return html;
      },
    },
    legend: {
      orient: "horizontal",
      type: "scroll",
      bottom: 10,
      left: "center",
      itemWidth: 15,
      itemHeight: 15,
      textStyle: { color: "#374151", fontSize: 12 },
      pageIconColor: "#374151",
      data: persons.map((p: any) => ({ name: p, icon: "circle", itemStyle: { color: personColors[p] || "#999" } })),
    },
    grid: {
      left: "4%",
      right: "20%", // sağdaki renk kutusu için boşluk
      top: "12%",
      bottom: 80,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: topics,
      axisLabel: {
        color: "#374151",
        fontWeight: "bold",
        fontSize: 12,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#374151" },
      axisLine: { lineStyle: { color: "#d1d5db" } },
      splitLine: { lineStyle: { color: "#e5e7eb" } },
    },
    series,
  };

  // -------------------- RENDER -------------------- //
  return (
    <div style={{ position: "relative", width: "100%", height: 600 }}>
      <ReactECharts style={{ width: "100%", height: "100%" }} option={option} />

      {/* Sağda sabit duygu renk haritası */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          background: "rgba(233, 235, 238, 0.7)",
          padding: "10px 14px",
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        {allEmotions.map((emo : any) => (
          <div key={emo} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
            <span
              style={{
                width: 14,
                height: 14,
                backgroundColor: emotionColors[emo],
                borderRadius: 3,
                marginRight: 8,
              }}
            />
            <span style={{ color: "#000", fontSize: 12 }}>{emo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default EmotionTopicBarChart;