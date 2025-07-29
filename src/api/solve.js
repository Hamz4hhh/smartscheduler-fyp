// frontend/src/api/solve.js
export async function solveTimetable() {
  const response = await fetch('http://localhost:8000/solve-timetable', {
    method: 'POST',
  });

  const data = await response.json();
  return data;
}
