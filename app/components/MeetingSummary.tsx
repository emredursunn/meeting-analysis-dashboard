"use client";
import { summary } from "../data/meeting";

const MeetingSummary = () => (
  <div>
    <p className="mb-4 text-sm text-gray-700">{summary.general}</p>

    <h4 className="text-lg font-semibold mt-6 mb-2">Toplantının Amacı</h4>
    <p className="mb-4 text-sm text-gray-700">{summary.purpose}</p>

    <h4 className="text-lg font-semibold mt-6 mb-2">Ana Başlıklar</h4>
    <ul className="list-disc list-inside text-sm text-gray-700">
      {summary.mainTopics.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>

    <h4 className="text-lg font-semibold mt-6 mb-2">Alınan Kararlar</h4>
    <p className="text-sm text-gray-700">{summary.decisions}</p>
  </div>
);

export default MeetingSummary;
