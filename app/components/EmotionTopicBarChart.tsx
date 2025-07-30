import ReactECharts from 'echarts-for-react';

const topicEmotionData: any = {
  "topics": [
    {
      "topic": "Intro & Task Distribution", "start_sec": 3, "end_sec": 49,
      "persons": {
        "Agent Walker": { "Neutral": 40.0, "Happiness": 20.0, "Stress": 15.0},
        "John Casey": { "Neutral": 35.0, "Sadness": 10.0, "Anger": 5.0 },
        "Cuch Bartowski": { "Neutral": 45.0, "Stress": 15.0, "Sadness": 8.0 }
      }
    },
    {
      "topic": "Technical Details", "start_sec": 49, "end_sec": 114,
      "persons": {
        "Agent Walker": { "Fear": 30.0, "Happiness": 10.0, "Stress": 25.0},
        "Cuch Bartowski": { "Neutral": 35.0, "Happiness": 15.0, "Fear": 5.0 },
        "John Casey": {"Sadness": 15.0, "Stress": 30.0, "Anger": 10.0 }
      }
    },
    {
      "topic": "Client Concerns & Deadlines", "start_sec": 114, "end_sec": 178,
      "persons": {
        "Agent Walker": { "Fear": 15.0, "Surprise": 5.0, "Stress": 25.0 },
        "Cuch Bartowski": { "Fear": 30.0, "Surprise": 25.0, "Stress": 15.0 },
        "Muhammed Sefa Sozer": { "Anger": 55.0, "Fear": 10.0, "Surprise": 15.0, }
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
    "Guney Ozturk": "#F87171",
    "Muhammed Sefa Sozer": "#60A5FA",
    "Selin Uzeyiroglu": "#2DD4BF",
    "Hilmi Tunahan Ahlatci": "#C084FC",
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
        color: "#E5E7EB",
        fontSize: 12,
        distance: 6,
        textBorderColor: "#0A0A0A",
        textBorderWidth: 2,
      },
    });
  });

  // -------------------- OPTION -------------------- //
  const option: any = {
    backgroundColor: "transparent",
    title: {
      text: "Konuya Göre Kişi • Duygu Dağılımı",
      left: "center",
      textStyle: { color: "#E5E7EB" },
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
      textStyle: { color: "#E5E7EB", fontSize: 12 },
      pageIconColor: "#E5E7EB",
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
        color: "#E5E7EB",
        fontWeight: "bold",
        fontSize: 12,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#E5E7EB" },
      axisLine: { lineStyle: { color: "#6B7280" } },
      splitLine: { lineStyle: { color: "#374151" } },
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
          background: "rgba(17, 24, 39, 0.7)",
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
            <span style={{ color: "#F9FAFB", fontSize: 12 }}>{emo}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default EmotionTopicBarChart;