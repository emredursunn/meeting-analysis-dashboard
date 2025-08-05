"use client";
import { topics } from "../data/meeting";

const TopicsNotes = () => (
  <div>
    <div className="space-y-4">
      {topics.map(({ title, notes }) => (
        <div key={title}>
          <h5 className="text-base font-semibold mb-1">{title}</h5>
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
