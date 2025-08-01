"use client";
import { tasks, mood, nextSteps } from "../data/meeting";

const TasksList = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Görevler</h2>
    <table className="w-full text-sm text-left text-gray-300 mb-6">
      <thead className="text-xs uppercase text-gray-400 border-b border-gray-600">
        <tr>
          <th scope="col" className="py-2 px-3">Kişi</th>
          <th scope="col" className="py-2 px-3">Görev</th>
          <th scope="col" className="py-2 px-3">Tarih</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <tr key={t.person} className="border-b border-gray-700">
            <td className="py-2 px-3 font-medium whitespace-nowrap">{t.person}</td>
            <td className="py-2 px-3">{t.task}</td>
            <td className="py-2 px-3 whitespace-nowrap">{t.due}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 className="text-xl font-semibold mt-4 mb-2">Duygu Durumu</h3>
    <ul className="list-disc list-inside text-sm text-gray-300">
      <li><b>Pozitif:</b> {mood.positive}</li>
      <li><b>Negatif:</b> {mood.negative}</li>
      <li><b>Belirsiz:</b> {mood.uncertain}</li>
    </ul>

    <h3 className="text-xl font-semibold mt-6 mb-2">Sonraki Adımlar</h3>
    <p className="text-sm text-gray-300 mb-2"><b>En önemli iş:</b> {nextSteps.important}</p>
    <ul className="list-disc list-inside text-sm text-gray-300">
      {nextSteps.followUp.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  </div>
);

export default TasksList;
