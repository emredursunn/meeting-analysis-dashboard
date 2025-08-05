import ReactECharts from 'echarts-for-react';

const radarData: any = {
  team_avg: {
    "Happiness": 21.67,
    "Sadness": 15.13,
    "Stress": 15.85,
    "Anger": 4.08,
    "Neutral": 41.36,
    "Surprise": 1.85
  },
  "Orion": {
    "Happiness": 14.57,
    "Sadness": 7.00,
    "Stress": 31.5,
    "Anger": 10.5,
    "Neutral": 33.98,
    "Surprise": 2.45
  },
  "Agent Walker": {
    "Happiness": 29.17,
    "Sadness": 22.11,
    "Stress": 24.5,
    "Anger": 3.5,
    "Neutral": 20.73,
    "Surprise": 0.0
  },
  "John Casey": {
    "Happiness": 14.17,
    "Sadness": 29.26,
    "Stress": 17.5,
    "Anger": 7.0,
    "Neutral": 31.51,
    "Surprise": 0.45
  },
  "Chuck Bartowski": {
    "Happiness": 24.51,
    "Sadness": 24.56,
    "Stress": 21.0,
    "Anger": 3.5,
    "Neutral": 24.36,
    "Surprise": 1.86
  },
  "Ellie": {
    "Happiness": 21.83,
    "Sadness": 5.07,
    "Stress": 0.6,
    "Anger": 0.0,
    "Neutral": 70.43,
    "Surprise": 2.07
  },
  "Carina": {
    "Happiness": 25.77,
    "Sadness": 2.8,
    "Stress": 0.0,
    "Anger": 0.0,
    "Neutral": 67.17,
    "Surprise": 4.27
  }
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
      textStyle: { color: '#1f2937' }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: participants.map(name => name === 'team_avg' ? 'Takım Ortalaması' : name),
      bottom: 15,
      textStyle: { color: '#374151' }
    },
    radar: {
      indicator: emotions.map(emotion => ({ name: emotion, max: 50 })),
      center: ['50%', '45%'],
      radius: '65%',
      axisName: {
        color: '#4b5563',
        fontSize: 12,
      },
      splitArea: {
          areaStyle: {
              color: ['rgba(200,200,200,0.2)', 'rgba(220,220,220,0.2)'],
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
          }
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(100, 100, 100, 0.3)'
          }
      },
      splitLine: {
          lineStyle: {
              color: 'rgba(100, 100, 100, 0.3)'
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

  return <ReactECharts option={option} style={{height: '500px', width: '100%' }} />;
};

export default EmotionsRadarChart;
