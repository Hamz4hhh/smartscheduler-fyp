import React, { useEffect, useState } from "react";
import { getRooms, addRoom, updateRoom, deleteRoom } from "../api/roomsApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    room_number: "",
    name: "",
    capacity: "",
    room_type: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getRooms();
    setRooms(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateRoom(editId, formData);
        toast.success("Room updated!");
      } else {
        await addRoom({ ...formData, is_active: true });
        toast.success("Room added!");
      }
      setFormData({ room_number: "", name: "", capacity: "", room_type: "" });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Error saving room");
    }
  };

  const handleEdit = (room) => {
    setFormData({
      room_number: room.room_number,
      name: room.name,
      capacity: room.capacity,
      room_type: room.room_type,
    });
    setEditId(room.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this room?")) return;
    await deleteRoom(id);
    toast.success("Room deleted!");
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Rooms</h1>
      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({ room_number: "", name: "", capacity: "", room_type: "" });
          setEditId(null);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "+ Add Room"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow my-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Room Number"
            value={formData.room_number}
            onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Room Type"
            value={formData.room_type}
            onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
          >
            {editId ? "Update" : "Save"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white p-4 rounded shadow border hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold">{room.name}</h2>
            <p className="text-gray-600">Number: {room.room_number}</p>
            <p className="text-gray-600">Capacity: {room.capacity}</p>
            <p className="text-gray-600">Type: {room.room_type}</p>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleEdit(room)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Rooms;
