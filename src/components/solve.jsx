import { solveTimetable } from '../api/solve';

function SolveButton() {
  const handleSolve = async () => {
    const result = await solveTimetable();
    console.log(result.output || result.error);
    alert("Solver finished! Check console for output.");
  };

  return (
    <button onClick={handleSolve} className="bg-blue-500 text-white px-4 py-2 rounded">
      Run Solver
    </button>
  );
}

export default SolveButton;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';