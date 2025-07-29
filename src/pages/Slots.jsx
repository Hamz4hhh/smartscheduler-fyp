import React, { useEffect, useState } from "react";
import { getSlots, addSlot, updateSlot, deleteSlot } from "../api/slotsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const data = await getSlots();
      setSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateSlot(editId, formData);
        toast.success("Slot updated successfully!");
      } else {
        await addSlot(formData);
        toast.success("Slot added successfully!");
      }
      fetchSlots();
      setFormData({ name: "", start_time: "", end_time: "" });
      setShowForm(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving slot:", error);
      toast.error("An error occurred");
    }
  };

  const handleEdit = (slot) => {
    setEditId(slot.id);
    setFormData({
      name: slot.name,
      start_time: slot.start_time,
      end_time: slot.end_time,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) return;
    try {
      await deleteSlot(id);
      toast.success("Slot deleted successfully!");
      fetchSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("Failed to delete slot");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <ToastContainer />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Time Slots</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setFormData({ name: "", start_time: "", end_time: "" });
            setEditId(null);
          }}
          className={`px-4 py-2 rounded-lg shadow transition ${
            showForm ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {showForm ? "Cancel" : "+ Add Slot"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow border space-y-4 transition-all duration-300"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Slot Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.start_time}
                onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.end_time}
                onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
          >
            {editId ? "Update Slot" : "Save Slot"}
          </button>
        </form>
      )}

      {/* Slots Table */}
      <div className="bg-white rounded-xl shadow-sm p-4 border transition-all duration-300">
        {slots.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-6">
            🕒 No time slots added yet. Click "Add Slot" to create one.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Start</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">End</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-2">{slot.name}</td>
                  <td className="px-4 py-2">{slot.start_time}</td>
                  <td className="px-4 py-2">{slot.end_time}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(slot)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(slot.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Slots;
