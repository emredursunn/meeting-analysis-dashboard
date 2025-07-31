import ReactECharts from 'echarts-for-react';

const shoutingData = {
  "0-20": 0,
  "20-40": 0,
  "40-60": 0,
  "60-80": 0,
  "80-100": 0,
  "100-120": 0,
  "120-140": 0,
  "140-160": 0,
  "160-180": 0,
  "180-200": 0,
  "200-220": 0,
  "220-240": 0,
  "240-260": 0,
  "260-280": 0,
  "280-300": 0,
  "300-320": 0,
  "320-340": 0,
  "340-360": 0,
  "360-380": 0,
  "380-400": 0,
  "400-420": 0,
  "420-440": 0,
  "440-460": 0,
  "460-480": 0,
  "480-500": 0,
  "500-520": 0,
  "520-540": 0,
  "540-560": 0,
  "560-580": 0,
  "580-600": 0,
  "600-620": 0,
  "620-640": 0,
  "640-660": 0,
  "660-680": 0,
  "680-700": 0,
  "700-720": 0,
  "720-740": 0,
  "740-760": 0,
  "760-780": 0,
  "780-800": 0,
  "800-820": 0,
  "820-840": 0,
  "840-860": 0,
  "860-880": 0,
  "880-900": 0,
  "900-920": 0,
  "920-940": 0,
  "940-960": 0,
  "960-980": 0,
  "980-1000": 0,
  "1000-1020": 0,
  "1020-1040": 0,
  "1040-1060": 1,
  "1060-1080": 0,
  "1080-1100": 0,
  "1100-1120": 0,
  "1120-1140": 0,
  "1140-1160": 0,
  "1160-1180": 0,
  "1180-1200": 0,
  "1200-1220": 0,
  "1220-1240": 0,
  "1240-1260": 3,
  "1260-1280": 1,
  "1280-1300": 0,
  "1300-1320": 0,
  "1320-1340": 0,
  "1340-1360": 0,
  "1360-1380": 0,
  "1380-1400": 0,
  "1400-1420": 0,
  "1420-1440": 0,
  "1440-1460": 0,
  "1460-1480": 0,
  "1480-1500": 0,
  "1500-1520": 0,
  "1520-1540": 0,
  "1540-1560": 0
}

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