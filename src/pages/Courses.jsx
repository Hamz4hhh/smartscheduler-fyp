import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    dept_id: "",
    course_code: "",
    course_name: "",
    credit_hours: "",
    hours_per_week: "",
    course_type: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/courses/");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://127.0.0.1:8000/api/courses/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://127.0.0.1:8000/api/courses/", form);
    }
    setForm({
      dept_id: "",
      course_code: "",
      course_name: "",
      credit_hours: "",
      hours_per_week: "",
      course_type: "",
    });
    fetchCourses();
  };

  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Courses</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="dept_id" type="number" placeholder="Dept ID" value={form.dept_id} onChange={handleChange} className="input" required />
          <input name="course_code" placeholder="Course Code" value={form.course_code} onChange={handleChange} className="input" required />
          <input name="course_name" placeholder="Course Name" value={form.course_name} onChange={handleChange} className="input" required />
          <input name="credit_hours" type="number" placeholder="Credit Hours" value={form.credit_hours} onChange={handleChange} className="input" required />
          <input name="hours_per_week" type="number" placeholder="Hours/Week" value={form.hours_per_week} onChange={handleChange} className="input" required />
          <input name="course_type" placeholder="Course Type" value={form.course_type} onChange={handleChange} className="input" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Dept ID</th>
              <th className="px-4 py-2">Course Code</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Credit Hours</th>
              <th className="px-4 py-2">Hours/Week</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-2">{course.id}</td>
                <td className="px-4 py-2">{course.dept_id}</td>
                <td className="px-4 py-2">{course.course_code}</td>
                <td className="px-4 py-2">{course.course_name}</td>
                <td className="px-4 py-2">{course.credit_hours}</td>
                <td className="px-4 py-2">{course.hours_per_week}</td>
                <td className="px-4 py-2">{course.course_type}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(course)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center px-4 py-4 text-gray-500">No courses available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
