import ReactECharts from 'echarts-for-react';

const radarData : any = {
  "Norman": { "Happiness": 15.00, "Sadness": 20.00, "Stress": 17.00, "Anger": 8.00, "Neutral": 22.00, "Surprise": 18.00 },
  "Orion": { "Happiness": 15.59, "Sadness": 9.04, "Stress": 21.00, "Anger": 6.06, "Neutral": 42.30, "Surprise": 6.01 },
  "Agent Walker": { "Happiness": 18.20, "Sadness": 12.10, "Stress": 19.50, "Anger": 8.40, "Neutral": 35.80, "Surprise": 6.00 },
  "John Casey": { "Happiness": 20.80, "Sadness": 9.50, "Stress": 23.00, "Anger": 4.30, "Neutral": 36.40, "Surprise": 6.00 },
  "Chuck Bartowski": { "Happiness": 16.10, "Sadness": 10.80, "Stress": 28.00, "Anger": 6.00, "Neutral": 33.10, "Surprise": 6.00 }
};

/**
 * Kişi Bazlı Duygu Karşılaştırma Radar Grafiği
 */
const EmotionsRadarChart = () => {
  const emotions = Object.keys(radarData.team_avg);
  const participants = Object.keys(radarData);

  const seriesData = participants.map(name => ({
    name: name === 'team_avg' ? 'Takım Ortalaması' : name,
    value: emotions.map(emotion => radarData[name][emotion] || 0),
    lineStyle: name === 'team_avg' ? { width: 4, type: 'dashed' } : { width: 2 },
    areaStyle: { opacity: 0.2 }
  }));

  const option = {
    title: {
      text: 'Duygu Dağılımı Karşılaştırması (Radar)',
      left: 'center',
      textStyle: { color: '#ededed' }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: participants.map(name => name === 'team_avg' ? 'Takım Ortalaması' : name),
      bottom: 0,
      textStyle: { color: '#ededed' }
    },
    radar: {
      indicator: emotions.map(emotion => ({ name: emotion, max: 50 })),
      axisName: {
        color: '#ccc',
        fontSize: 12,
      },
      splitArea: {
          areaStyle: {
              color: ['rgba(50, 50, 50, 0.2)', 'rgba(40, 40, 40, 0.2)'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(200, 200, 200, 0.3)'
          }
      },
      splitLine: {
          lineStyle: {
              color: 'rgba(200, 200, 200, 0.3)'
          }
      }
    },
    series: [
      {
        name: 'Duygu Dağılımı',
        type: 'radar',
        data: seriesData
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />;
};

export default EmotionsRadarChart;
