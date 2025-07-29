import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Instructors from "./pages/Instructors";
import Batches from "./pages/Batches";
import Slots from "./pages/Slots";
import Courses from "./pages/Courses";
import SolveButton from './components/solve';

const Dummy = ({ title }) => (
  <div className="p-10 text-2xl font-bold">{title}</div>
);

const SolvePage = () => (
  <div className="p-10">
    <h2 className="text-2xl font-bold mb-4">Run Timetable Solver</h2>
    <SolveButton />
  </div>
);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : collapsed ? 80 : 256;

  return (
    <Router>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} isMobile={isMobile} />
      <div
        className="min-h-screen bg-white transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/solve" element={<SolvePage />} />
          <Route path="/settings" element={<Dummy title="Settings" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
