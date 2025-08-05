import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { Speaker } from './types/konusmaciAnalizi';

interface SpeakerTimelineChartProps {
  speakers: Speaker[];
  colorMap: Record<string, string>;
}

const SpeakerTimelineChart: React.FC<SpeakerTimelineChartProps> = ({ speakers, colorMap }) => {
  // Toplam süreyi bul
  const maxEnd = Math.max(
    ...speakers.flatMap(speaker =>
      speaker.segments.map(seg => seg.endSeconds)
    ),
    0
  );

  // ECharts için verileri tek bir diziye dönüştür
  const chartData = speakers.flatMap((speaker, speakerIdx) =>
    speaker.segments.map(seg => ({
      name: speaker.name,
      itemStyle: { color: colorMap[speaker.name] || '#3B82F6' },
      value: [seg.startSeconds, seg.endSeconds, speakerIdx, seg.duration, seg.durationFormatted, seg.start, seg.end],
    }))
  ); // speakerIdx burada kullanılıyor, renderItem'da kullanılmayanları kaldıracağız.

  const option = {
    tooltip: {
      formatter: (params: any) => {
        const [, , , , durationFormatted, startStr, endStr] = params.value;
        return `
          <b>${params.name}</b><br/>
          ${startStr} - ${endStr}<br/>
          Süre: ${durationFormatted}
        `;
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      top: 40,
      bottom: 40,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: maxEnd,
      name: 'Süre (sn)',
      axisLabel: {
        formatter: (value: number) => {
          const m = Math.floor(value / 60);
          const s = (value % 60).toFixed(0).padStart(2, '0');
          return `${m}:${s}`;
        }
      }
    },
    yAxis: {
      type: 'category',
      data: speakers.map(s => s.name),
      inverse: true,
      axisLabel: {
        fontWeight: 600,
      },
    },
    series: [
      {
        type: 'custom',
        renderItem: (params: any, api: any) => {
          const categoryIndex = api.value(2);
          const start = api.coord([api.value(0), categoryIndex]);
          const end = api.coord([api.value(1), categoryIndex]);
          const height = api.size([0, 1])[1] * 0.6; 
          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height,
            },
            style: api.style(),
          };
        },
        encode: {
          x: [0, 1],
          y: 2,
          tooltip: [0, 1, 3, 4, 5, 6],
        },
        data: chartData,
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: 60 * speakers.length }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default SpeakerTimelineChart;
