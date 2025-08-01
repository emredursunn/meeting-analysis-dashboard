"use client";
import MeetingSummary from "./MeetingSummary";
import TasksList from "./TasksList";
import TopicsNotes from "./TopicsNotes";

const meetings = ["Toplantı 1", "Toplantı 2", "Toplantı 3"];

const Sidebar = () => (
  <aside className="bg-[#171717] w-80 flex flex-col h-screen">
    <div className="p-4 overflow-y-auto flex-1">
      <h2 className="text-xl font-semibold mb-2">Toplantılar</h2>
      <ul className="mb-6 space-y-1">
        {meetings.map((m) => (
          <li key={m} className="cursor-pointer hover:underline text-sm">
            {m}
          </li>
        ))}
      </ul>
      <MeetingSummary />
      <div className="mt-6">
        <TasksList />
      </div>
      <div className="mt-6">
        <TopicsNotes />
      </div>
    </div>
    <div className="p-4 border-t border-gray-700 text-sm">
      <p className="mb-2">Kullanıcı: Demo User</p>
      <button className="w-full py-2 bg-red-600 rounded">Logout</button>
    </div>
  </aside>
);

export default Sidebar;
