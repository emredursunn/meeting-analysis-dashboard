"use client";
import MeetingSummary from "./MeetingSummary";
import TasksList from "./TasksList";
import TopicsNotes from "./TopicsNotes";

const meetings = ["Toplantı 1", "Toplantı 2", "Toplantı 3"];

const Sidebar = () => (
  <aside className="bg-[#171717] w-96 fixed top-0 bottom-0 left-0 flex flex-col shadow-lg">
    <div className="p-6 overflow-y-auto flex-1 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Toplantılar</h2>
        <ul className="space-y-2 text-sm">
        {meetings.map((m) => (
          <li key={m} className="cursor-pointer hover:underline">
            {m}
          </li>
        ))}
        </ul>
      </div>
      <MeetingSummary />
      <TasksList />
      <TopicsNotes />
    </div>
    <div className="p-6 border-t border-gray-700 text-sm">
      <p className="mb-2">Kullanıcı: Demo User</p>
      <button className="w-full py-2 bg-red-600 rounded">Logout</button>
    </div>
  </aside>
);

export default Sidebar;
