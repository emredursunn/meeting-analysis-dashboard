"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import ReactECharts from "echarts-for-react"

// JSON verisini import ediyoruz
import meetingData from "../data/meeting_radar_graph_new.json"

function parseDurationToMs(durationStr: string): number {
  if (!durationStr || durationStr === "00:00:00.000") return 0
  const [h, m, sMs] = durationStr.split(":")
  const [s, ms] = sMs.split(".")
  return (parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s)) * 1000 + parseInt(ms)
}

function formatDuration(ms: number): string {
  if (ms === 0) return "0sn"
  const sec = Math.floor(ms / 1000)
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return [h > 0 ? `${h}sa` : "", m > 0 ? `${m}dk` : "", s > 0 ? `${s}sn` : ""].filter(Boolean).join(" ")
}

interface ParticipantDatum {
  name: string
  ms: number
  dialogueDurations: Record<string, string>
  monologueDuration: number
}

export default function MeetingRadar() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const chartRef = useRef<any>(null)

  // Konuları tek listede topla (bölümler kaldırıldı). Veri hâlâ bölümlü gelirse düzleştir.
  const allTopics = useMemo(() => {
    if (Array.isArray(meetingData) && meetingData.length > 0) {
      const first = meetingData[0] as any
      if (first && typeof first === "object" && "topics" in first) {
        return (meetingData as any[]).flatMap((section: any) => section.topics || [])
      }
      return meetingData as any[]
    }
    return [] as any[]
  }, [])

  // Seçili konuyu al
  const currentTopic = allTopics[selectedTopic]

  const totalDurationMs = currentTopic ? parseDurationToMs(currentTopic.duration) : 0

  const participants = useMemo<ParticipantDatum[]>(() => 
    currentTopic?.analysis.map((p: any) => ({
      name: p.name,
      ms: parseDurationToMs(p.total_speaking_duration),
      dialogueDurations: p.dialogue_durations as Record<string, string>,
      monologueDuration: parseDurationToMs(p.monologue_duration)
    })) || [], [currentTopic]
  )

  // En aktif katılımcıları bul
  const topParticipants = useMemo<ParticipantDatum[]>(() => [...participants]
    .sort((a: ParticipantDatum, b: ParticipantDatum) => b.ms - a.ms)
    .slice(0, 3), [participants])

  // Pencere boyutu değişikliklerini dinle
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const option = useMemo(() => {
    const colors = ['#8B5CF6','#06B6D4','#10B981','#F59E0B','#EF4444','#3B82F6']
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const idx = participants.findIndex((p: ParticipantDatum) => p.name === params.seriesName)
          const p = participants[idx]
          
          // İkili görüşme detayları
          const dialogueDetails = Object.entries(p.dialogueDurations)
            .filter(([, duration]) => parseDurationToMs(duration as string) > 0)
            .map(([participantName, duration]) => `• ${participantName}: ${duration}`)
            .join('<br/>')

          return `
            <div style="padding: 8px;">
              <b style="color:${colors[idx % colors.length]}">${p.name}</b><br/>
              📊 Toplam Konuşma: <b>${formatDuration(p.ms)}</b><br/>
              📈 Katılım Oranı: <b>${((p.ms/totalDurationMs)*100).toFixed(1)}%</b><br/>
              🎤 Monolog: <b>${formatDuration(p.monologueDuration)}</b><br/>
              ${dialogueDetails ? `<br/>💬 İkili Görüşmeler:<br/>${dialogueDetails}` : ''}
            </div>
          `
        }
      },
      series: participants.map((p: ParticipantDatum, idx: number) => ({
        name: p.name,
        type: 'radar',
        data: [Array(participants.length).fill(0).map((_, i) => (i === idx ? totalDurationMs - p.ms : 100000000000000000000000))],
        symbolSize: 18,
        itemStyle: { color: colors[idx % colors.length] },
        lineStyle: { width: 0, color: 'transparent' },
        areaStyle: undefined,
        label: {
          show: true,
          color: colors[idx % colors.length],
          fontWeight: 'bold',
          fontSize: 13,
          formatter: () => formatDuration(p.ms)
        }
      })),
      radar: {
        indicator: participants.map((p: ParticipantDatum) => ({ name: p.name, max: totalDurationMs })),
        center: ['50%', '55%'],
        radius: '60%',
        splitNumber: 5,
        shape: 'circle',
        axisName: {
          color: '#374151',
          fontWeight: 'bold',
          fontSize: 14,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(66, 230, 126, 1)',
            width: 1
          }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(66, 230, 126, 0.1)', 'rgba(66, 230, 126, 0.4)', 'rgba(66, 230, 126, 0.3)', 'rgba(66, 230, 126, 0.2)']
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 230, 126, 1)',
            width:1
          }
        }
      },
    }
  }, [participants, totalDurationMs]);

  if (!currentTopic) {
    return <div className="p-6 bg-white rounded-xl shadow-lg">Veri yükleniyor...</div>
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2">
        {/* Sol taraf - Grafik */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <div className="flex flex-wrap gap-2 justify-center items-center">
                {allTopics.map((topic: any, index: number) => {
                  const isActive = index === selectedTopic
                  return (
                    <button
                      key={`${topic.topic}-${index}`}
                      type="button"
                      onClick={() => setSelectedTopic(index)}
                      className={
                        `px-3 py-1.5 rounded-full text-sm font-medium transition-colors shadow-sm ` +
                        (isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                      }
                    >
                      {topic.topic} ({topic.startTime} - {topic.endTime})
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          
          
          <div className="relative w-full" style={{ height: '400px' }}>
            <ReactECharts 
              ref={chartRef}
              option={option} 
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>

        {/* Sağ taraf - Analiz Bilgileri */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6 lg:self-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Genel İstatistikler</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Konu Süresi:</span>
                <span className="font-semibold">{currentTopic.startTime} - {currentTopic.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Katılımcı Sayısı:</span>
                <span className="font-semibold">{participants.length}</span>
              </div>
              <div className="flex justify-between">
                <span>En Aktif:</span>
                <span className="font-semibold text-blue-600">{topParticipants[0]?.name}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">🏆 En Aktif Katılımcılar</h3>
            <div className="space-y-2">
              {topParticipants.map((p: ParticipantDatum, idx: number) => (
                <div key={p.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                    <span className="text-sm font-medium">{p.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {formatDuration(p.ms)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
