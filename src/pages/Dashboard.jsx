import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    rooms: 0,
    instructors: 0,
    batches: 0,
    courses: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const [roomsRes, instructorsRes, batchesRes, coursesRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/rooms/"),
          axios.get("http://127.0.0.1:8000/api/instructors/"),
          axios.get("http://127.0.0.1:8000/api/batches/"),
          axios.get("http://127.0.0.1:8000/api/courses/"),
        ]);

        setSummary({
          rooms: roomsRes.data.length,
          instructors: instructorsRes.data.length,
          batches: batchesRes.data.length,
          courses: coursesRes.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchSummary();
  }, []);

  const cards = [
    {
      title: "Total Rooms",
      value: summary.rooms,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Instructors",
      value: summary.instructors,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Batches",
      value: summary.batches,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Courses",
      value: summary.courses,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
<div className="p-6 space-y-6 ml-64">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl p-4 shadow-sm ${item.color} border`}
          >
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Today’s Classes (Static Placeholder) */}
      <div className="bg-white rounded-xl shadow-sm p-4 border">
        <h2 className="text-lg font-semibold mb-3">Today's Classes</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>📘 CS-7A — Data Structures (Room A101) — 9:30–11:00</li>
          <li>🧮 SE-6B — Algorithms (Room A202) — 11:00–12:30</li>
          <li>💻 IT-5A — Python Lab (Lab-3) — 12:30–2:00</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
