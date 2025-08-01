"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingSummary from "./MeetingSummary";
import TasksList from "./TasksList";
import TopicsNotes from "./TopicsNotes";

const meetings = [
  "Toplantı 1 - Pazarlama",
  "Toplantı 2 - Ürün Geliştirme",
  "Toplantı 3 - Sprint Planlama",
  "Toplantı 4 - Retrospektif",
  "Toplantı 5 - Q&A",
];

const Sidebar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(meetings[0]);

  const filtered = meetings.filter((m) =>
    m.toLowerCase().includes(query.toLowerCase())
  );

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
    }
    router.push("/login");
  };

  return (
    <aside className="bg-white w-[30rem] fixed top-0 bottom-0 left-0 flex flex-col shadow-lg border-r border-gray-200">
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Toplantılar</h2>
          <input
            type="text"
            placeholder="Toplantı ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-3 w-full border px-3 py-2 rounded"
          />
          <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
            {filtered.map((m) => (
              <li
                key={m}
                onClick={() => setSelected(m)}
                className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                  selected === m ? "bg-gray-200 font-medium" : ""
                }`}
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
        <MeetingSummary />
        <TasksList />
        <TopicsNotes />
      </div>
      <div className="p-6 border-t border-gray-200 text-sm flex items-center space-x-3">
        <img src="/favicon.ico" alt="User" className="w-8 h-8 rounded-full" />
        <span className="flex-1">John Doe</span>
        <button onClick={handleLogout} className="py-1 px-3 bg-red-500 text-white rounded">
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
