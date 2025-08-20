import ReactECharts from 'echarts-for-react';

const shoutingData = {
  "00:00:00-00:00:20": 0,
  "00:00:20-00:00:40": 0,
  "00:00:40-00:01:00": 0,
  "00:01:00-00:01:20": 0,
  "00:01:20-00:01:40": 0,
  "00:01:40-00:02:00": 0,
  "00:02:00-00:02:20": 0,
  "00:02:20-00:02:40": 0,
  "00:02:40-00:03:00": 0,
  "00:03:00-00:03:20": 0,
  "00:03:20-00:03:40": 2,
  "00:03:40-00:04:00": 3,
  "00:04:00-00:04:20": 3,
  "00:04:20-00:04:40": 2,
  "00:04:40-00:05:00": 0,
  "00:05:00-00:05:20": 0,
  "00:05:20-00:05:40": 1,
  "00:05:40-00:06:00": 1,
  "00:06:00-00:06:20": 2,
  "00:06:20-00:06:40": 2,
  "00:06:40-00:07:00": 1,
  "00:07:00-00:07:20": 1,
  "00:07:20-00:07:40": 2,
  "00:07:40-00:08:00": 3,
  "00:08:00-00:08:20": 3,
  "00:08:20-00:08:40": 4,
  "00:08:40-00:09:00": 3,
  "00:09:00-00:09:20": 5,
  "00:09:20-00:09:40": 4,
  "00:09:40-00:10:00": 3,
  "00:10:00-00:10:20": 0,
  "00:10:20-00:10:40": 0,
  "00:10:40-00:11:00": 0,
  "00:11:00-00:11:20": 0,
  "00:11:20-00:11:40": 0,
  "00:11:40-00:12:00": 1,
  "00:12:00-00:12:20": 1,
  "00:12:20-00:12:40": 2,
  "00:12:40-00:13:00": 2,
  "00:13:00-00:13:20": 1,
  "00:13:20-00:13:40": 1,
  "00:13:40-00:14:00": 1,
  "00:14:00-00:14:20": 0,
  "00:14:20-00:14:40": 0,
  "00:14:40-00:15:00": 0,
  "00:15:00-00:15:20": 0,
  "00:15:20-00:15:40": 0,
  "00:15:40-00:16:00": 0,
  "00:16:00-00:16:20": 0,
  "00:16:20-00:16:40": 0,
  "00:16:40-00:17:00": 0,
  "00:17:00-00:17:20": 0,
  "00:17:20-00:17:40": 1,
  "00:17:40-00:18:00": 0,
  "00:18:00-00:18:20": 0,
  "00:18:20-00:18:40": 1,
  "00:18:40-00:19:00": 1,
  "00:19:00-00:19:20": 1,
  "00:19:20-00:19:40": 2,
  "00:19:40-00:20:00": 2,
  "00:20:00-00:20:20": 2,
  "00:20:20-00:20:40": 2,
  "00:20:40-00:21:00": 3,
  "00:21:00-00:21:20": 1,
  "00:21:20-00:21:40": 0,
  "00:21:40-00:22:00": 0,
  "00:22:00-00:22:20": 0,
  "00:22:20-00:22:40": 0,
  "00:22:40-00:23:00": 0,
  "00:23:00-00:23:20": 0,
  "00:23:20-00:23:40": 0,
  "00:23:40-00:24:00": 0,
  "00:24:00-00:24:20": 0,
  "00:24:20-00:24:40": 0,
  "00:24:40-00:25:00": 0,
  "00:25:00-00:25:20": 0,
  "00:25:20-00:25:40": 0,
  "00:25:40-00:26:00": 0
}


interface ShoutingChartProps {
  isPreview?: boolean;
  height?: number;
}

/**
 * Bağırma Yoğunluğu Zaman Serisi Grafiği
 */
const ShoutingChart: React.FC<ShoutingChartProps> = ({ 
  isPreview = false, 
  height = 400 
}) => {
  const option = {
    title: {
      // text: 'Ses Anomalileri (Zaman Serisi)',
      text: "",
      left: 'center',
      textStyle: { color: '#1f2937' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: isPreview 
        ? 'Anomali: {c}' 
        : 'Zaman Aralığı: {b}<br/>Anomali Sayısı: {c}'
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
      axisLine: { lineStyle: { color: '#201f1fff' } },
      axisLabel: {
        formatter: function(value: string) {
          if (isPreview) {
            // Preview modunda daha basit gösterim
            const timeRange = value.split('-');
            const startTime = timeRange[0].split(':');
            return `${startTime[1]}:${startTime[2]}`;
          }
          
          // "00:00:00-00:00:20" formatından "00:00" kısmını al
          const timeRange = value.split('-');
          const startTime = timeRange[0]; // "00:00:00"
          const endTime = timeRange[1];   // "00:00:20"
          
          // Saat kısmı 00 ise sadece dakika:saniye göster
          const formatTime = (time: string) => {
            const parts = time.split(':');
            const hours = parts[0];
            const minutes = parts[1];
            const seconds = parts[2];
            
            if (hours === '00') {
              return `${minutes}:${seconds}`;
            }
            return time;
          };
          
          return `${formatTime(startTime)}-${formatTime(endTime)}`;
        },
        rotate: 45,
        interval: function(index: number) {
          // Preview modunda daha az label göster
          const interval = isPreview ? 8 : 4;
          return index % interval === 0;
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#201f1fff' } },
      splitLine: { lineStyle: { color: '#e5e7eb' } },
      minInterval: 1, // Y ekseninde sadece tam sayı göster
      
    },
    series: [
      {
        name: 'Anomali Sayısı',
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

  return <ReactECharts option={option} style={{ height: `${height}px`, width: '100%' }} />;
};

export default ShoutingChart;