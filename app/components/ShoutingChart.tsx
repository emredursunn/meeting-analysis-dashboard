import ReactECharts from 'echarts-for-react';

const shoutingData = {
  "0-20": 0, "20-40": 0, "40-60": 0, "60-80": 0, "80-100": 1, "100-120": 0,
  "120-140": 0, "140-160": 0, "160-180": 0, "180-200": 0, "200-220": 0,
  "220-240": 1, "240-260": 1, "260-280": 0, "280-300": 0, "300-320": 0
};

/**
 * Bağırma Yoğunluğu Zaman Serisi Grafiği
 */
const ShoutingChart = () => {
  const option = {
    title: {
      text: 'Bağırma Yoğunluğu (Zaman Serisi)',
      left: 'center',
      textStyle: { color: '#ededed' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: 'Zaman: {b}s<br/>Bağırma Sayısı: {c}'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Object.keys(shoutingData),
      axisLine: { lineStyle: { color: '#888' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#888' } },
      splitLine: { lineStyle: { color: '#333' } },
      minInterval: 1, // Y ekseninde sadece tam sayı göster
      
    },
    series: [
      {
        name: 'Bağırma Sayısı',
        type: 'line',
        data: Object.values(shoutingData),
        smooth: true,
        itemStyle: { color: '#f59e0b' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#f59e0b' }, { offset: 1, color: 'rgba(245, 158, 11, 0.1)' }]
          }
        },
        emphasis: {
            focus: 'series'
        },
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default ShoutingChart;