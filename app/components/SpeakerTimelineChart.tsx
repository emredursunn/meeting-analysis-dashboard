import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { Speaker } from './types/konusmaciAnalizi';

interface SpeakerTimelineChartProps {
  speakers: Speaker[];
  colorMap: Record<string, string>;
}

const parseHMSmsToSeconds = (timeStr?: string): number | null => {
  if (!timeStr) return null;
  // Expecting HH:MM:SS.mmm
  const match = timeStr.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);
  if (!match) return null;
  const [, hh, mm, ss, ms] = match;
  const h = parseInt(hh, 10);
  const m = parseInt(mm, 10);
  const s = parseInt(ss, 10);
  const millis = parseInt(ms, 10);
  return h * 3600 + m * 60 + s + millis / 1000;
};

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

  // Entry/Exit markers per speaker
  const markerData = speakers.map((speaker, speakerIdx) => {
    const enter = parseHMSmsToSeconds(speaker.enter_time);
    const exit = parseHMSmsToSeconds(speaker.exit_time);
    return { name: speaker.name, yIndex: speakerIdx, enter, exit, color: colorMap[speaker.name] || '#3B82F6' };
  });

  const option = {
    tooltip: {
      formatter: (params: any) => {
        const [, , , , durationFormatted, startStr, endStr] = params.value || [];
        if (!durationFormatted) return params.name;
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
      },
      // Entry markers (giriş ikonu)
      {
        type: 'custom',
        name: 'Entry',
        renderItem: (params: any, api: any) => {
          const xSec = api.value(0);
          const yIdx = api.value(1);
          if (xSec == null) return null;
          const coord = api.coord([xSec, yIdx]);
          const size = Math.min(16, api.size([10, 1])[1] * 0.6);
          return {
            type: 'path',
            shape: {
              pathData: 'M12 3l3 3h-2v8h-2V6H9l3-3z',
              x: coord[0] - size / 2,
              y: coord[1] - (api.size([0, 1])[1] * 0.6) / 2 - size + 16,
              width: size,
              height: size,
            },
            style: { fill: api.visual('color') || '#10B981' },
          };
        },
        encode: { x: 0, y: 1 },
        data: markerData.map(m => ({ value: [m.enter, m.yIndex], itemStyle: { color: m.color } })),
        silent: true,
        z: 3,
      },
      // Exit markers (çıkış ikonu)
      {
        type: 'custom',
        name: 'Exit',
        renderItem: (params: any, api: any) => {
          const xSec = api.value(0);
          const yIdx = api.value(1);
          if (xSec == null) return null;
          const coord = api.coord([xSec, yIdx]);
          const size = Math.min(16, api.size([10, 1])[1] * 0.6);
          return {
            type: 'path',
            shape: {
              pathData: 'M12 21l-3-3h2V10h2v8h2l-3 3z',
              x: coord[0] - size / 2,
              y: coord[1] - (api.size([0, 1])[1] * 0.6) / 2 - size + 16,
              width: size,
              height: size,
            },
            style: { fill: api.visual('color') || '#EF4444' },
          };
        },
        encode: { x: 0, y: 1 },
        data: markerData.map(m => ({ value: [m.exit, m.yIndex], itemStyle: { color: m.color } })),
        silent: true,
        z: 3,
      },
    ]
  } as any;

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', height: 60 * speakers.length }}
      opts={{ renderer: 'canvas' }}
    />
  );
};

export default SpeakerTimelineChart;
