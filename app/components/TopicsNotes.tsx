"use client";
import { topics } from "../data/meeting";

const TopicsNotes = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Konular ve Notlar</h2>
    <div className="space-y-4">
      {topics.map(({ title, notes }) => (
        <div key={title}>
          <h4 className="text-lg font-semibold mb-1">{title}</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default TopicsNotes;
