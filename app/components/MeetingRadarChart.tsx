"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import ReactECharts from "echarts-for-react"

// JSON verisini import ediyoruz
import meetingData from "../data/bolum_bazli_diyalog_analizi (2).json"

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

export default function MeetingRadar() {
  const [selectedSection, setSelectedSection] = useState(1)
  const [selectedTopic, setSelectedTopic] = useState(0)
  const chartRef = useRef<any>(null)

  // Seçili bölümü al
  const currentSection = meetingData.find(section => section.section === selectedSection)
  
  // Seçili konuyu al
  const currentTopic = currentSection?.topics[selectedTopic]

  // Bölüm seçenekleri
  const sectionOptions = meetingData.map(section => ({
    value: section.section,
    label: `Bölüm ${section.section} (${section.duration})`
  }))

  // Konu seçenekleri
  const topicOptions = currentSection?.topics.map((topic, index) => ({
    value: index,
    label: `${topic.topic} (${topic.duration})`
  })) || []

  const totalDurationMs = currentTopic ? parseDurationToMs(currentTopic.duration) : 0

  const participants = useMemo(() => 
    currentTopic?.analysis.map(p => ({
      name: p.name,
      ms: parseDurationToMs(p.total_speaking_duration),
      dialogueDurations: p.dialogue_durations,
      monologueDuration: parseDurationToMs(p.monologue_duration)
    })) || [], [currentTopic]
  )

  // En aktif katılımcıları bul
  const topParticipants = useMemo(() => [...participants]
    .sort((a, b) => b.ms - a.ms)
    .slice(0, 3), [participants])

  // En çok diyalog kuran ikiliyi bul
  const topDialogue = useMemo(() => participants.reduce((max, p) => {
    const maxDialogue = Object.entries(p.dialogueDurations).reduce((maxEntry, [participantName, duration]) => {
      const durationMs = parseDurationToMs(duration)
      return durationMs > maxEntry.duration ? { name: participantName, duration: durationMs } : maxEntry
    }, { name: '', duration: 0 })
    
    return maxDialogue.duration > max.duration ? maxDialogue : max
  }, { name: '', duration: 0 }), [participants])

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
          const idx = participants.findIndex(p => p.name === params.seriesName)
          const p = participants[idx]
          
          // İkili görüşme detayları
          const dialogueDetails = Object.entries(p.dialogueDurations)
            .filter(([, duration]) => parseDurationToMs(duration) > 0)
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
      series: participants.map((p, idx) => ({
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
        indicator: participants.map(p => ({ name: p.name, max: totalDurationMs })),
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sol taraf - Grafik */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm Seçin</label>
              <select 
                value={selectedSection} 
                onChange={(e) => {
                  setSelectedSection(Number(e.target.value))
                  setSelectedTopic(0)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sectionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Konu Seçin</label>
              <select 
                value={selectedTopic} 
                onChange={(e) => setSelectedTopic(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {topicOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          
          <div className="relative w-full" style={{ height: '650px' }}>
            <ReactECharts 
              ref={chartRef}
              option={option} 
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>

        {/* Sağ taraf - Analiz Bilgileri */}
        <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Genel İstatistikler</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Toplam Süre:</span>
                <span className="font-semibold">{currentTopic.duration}</span>
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
              {topParticipants.map((p, idx) => (
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

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">💬 İkili Görüşme Analizi</h3>
            <div className="space-y-2 text-sm">
              {topDialogue.duration > 0 && (
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-purple-600">En Uzun İkili Görüşme:</p>
                  <p className="text-xs text-gray-600">{topDialogue.name}</p>
                  <p className="font-semibold">{formatDuration(topDialogue.duration)}</p>
                </div>
              )}
              
              <div className="space-y-1">
                {participants.map(p => {
                  const totalDialogue = Object.values(p.dialogueDurations)
                    .reduce((sum, duration) => sum + parseDurationToMs(duration), 0)
                  return (
                    <div key={p.name} className="flex justify-between text-xs">
                      <span>{p.name}:</span>
                      <span className="font-medium">{formatDuration(totalDialogue)}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
