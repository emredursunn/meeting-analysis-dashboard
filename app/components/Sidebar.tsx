"use client";
import MeetingSummary from "./MeetingSummary";
import TasksList from "./TasksList";
import TopicsNotes from "./TopicsNotes";

const meetings = ["Toplantı 1", "Toplantı 2", "Toplantı 3"];

const Sidebar = () => (
  <aside className="bg-white w-[30rem] fixed top-0 bottom-0 left-0 flex flex-col shadow-lg border-r border-gray-200">
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
    <div className="p-6 border-t border-gray-200 text-sm flex items-center space-x-3">
      <img src="/favicon.ico" alt="User" className="w-8 h-8 rounded-full" />
      <span className="flex-1">Demo User</span>
      <button className="py-1 px-3 bg-red-500 text-white rounded">Çıkış Yap</button>
    </div>
  </aside>
);

export default Sidebar;
