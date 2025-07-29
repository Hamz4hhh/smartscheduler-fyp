import React, { useEffect, useState } from "react";
import {
  getInstructors,
  deleteInstructor,
  updateInstructor,
} from "../api/instructorsApi";
import AddInstructorForm from "../components/AddInstructorForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getInstructors();
      setInstructors(data);
    } catch (error) {
      console.error("Error fetching instructors: ", error);
      toast.error("Failed to fetch instructors");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this instructor?")) return;
    try {
      await deleteInstructor(id);
      setInstructors(instructors.filter((inst) => inst.id !== id));
      toast.success("Instructor deleted successfully!");
    } catch (error) {
      console.error("Error deleting instructor:", error);
      toast.error("Failed to delete instructor");
    }
  };

  const handleEditClick = (instructor) => {
    setEditId(instructor.id);
    setEditFormData({
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      email: instructor.email,
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await updateInstructor(id, editFormData);
      await fetchData();
      setEditId(null);
      toast.success("Instructor updated successfully!");
    } catch (error) {
      console.error("Error updating instructor:", error);
      toast.error("Failed to update instructor");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Instructors</h1>

      {/* Add Form */}
      <div className="mb-8">
        <AddInstructorForm setInstructors={setInstructors} />
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {instructors.map((instructor) => (
          <div
            key={instructor.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2 border border-gray-100 hover:shadow-lg transition duration-200"
          >
            {editId === instructor.id ? (
              <>
                <input
                  type="text"
                  name="first_name"
                  value={editFormData.first_name}
                  onChange={handleEditChange}
                  placeholder="First name"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="last_name"
                  value={editFormData.last_name}
                  onChange={handleEditChange}
                  placeholder="Last name"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleUpdate(instructor.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-700">
                  {instructor.first_name} {instructor.last_name}
                </p>
<p className="text-sm italic text-gray-600">{instructor.position}</p>
                <p className="text-gray-500">{instructor.email}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEditClick(instructor)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(instructor.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
    </div>
  );
};

export default Instructors;
