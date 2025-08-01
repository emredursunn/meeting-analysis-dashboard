"use client";
import { summary } from "../data/meeting";

const MeetingSummary = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Toplantı Özeti</h2>
    <p className="mb-4 text-sm text-gray-700">{summary.general}</p>

    <h3 className="text-xl font-semibold mt-6 mb-2">Toplantının Amacı</h3>
    <p className="mb-4 text-sm text-gray-700">{summary.purpose}</p>

    <h3 className="text-xl font-semibold mt-6 mb-2">Ana Başlıklar</h3>
    <ul className="list-disc list-inside text-sm text-gray-700">
      {summary.mainTopics.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-2">Alınan Kararlar</h3>
    <p className="text-sm text-gray-700">{summary.decisions}</p>
  </div>
);

export default MeetingSummary;
