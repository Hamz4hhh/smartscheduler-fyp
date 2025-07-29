import React, { useState } from "react";
import { addInstructor, getInstructors } from "../api/instructorsApi";

const AddInstructorForm = ({ setInstructors }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dept_id: "",
    position: "",
    max_hours_per_week: 0,
    is_active: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addInstructor(formData);
      const updated = await getInstructors();
      setInstructors(updated);
      setFormData({
        employee_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dept_id: "",
        position: "",
        max_hours_per_week: 0,
        is_active: 1,
      });
    } catch (error) {
      console.error("Error adding instructor:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-6 py-6 space-y-4 border border-gray-100"
    >
      <h2 className="text-xl font-semibold text-gray-700">Add Instructor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="employee_id"
          value={formData.employee_id}
          onChange={handleChange}
          placeholder="Employee ID"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="dept_id"
          value={formData.dept_id}
          onChange={handleChange}
          placeholder="Department ID"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="max_hours_per_week"
          value={formData.max_hours_per_week}
          onChange={handleChange}
          placeholder="Max Hours/Week"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Instructor
      </button>
    </form>
  );
};

export default AddInstructorForm;
