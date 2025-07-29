import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/batches/";

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    academic_year: "",
    session_type: "",
    start_date: "",
    end_date: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBatches = async () => {
    try {
      const res = await axios.get(API_URL);
      setBatches(res.data);
    } catch (err) {
      toast.error("Failed to fetch batches");
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}${editId}`, formData);
        toast.success("Batch updated");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Batch added");
      }
      setFormData({
        code: "",
        name: "",
        academic_year: "",
        session_type: "",
        start_date: "",
        end_date: "",
      });
      setEditId(null);
      setShowForm(false);
      fetchBatches();
    } catch (err) {
      toast.error("Failed to save batch");
    }
  };

  const handleEdit = (batch) => {
    setFormData(batch);
    setEditId(batch.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this batch?")) return;
    try {
      await axios.delete(`${API_URL}${id}`);
      toast.success("Batch deleted");
      fetchBatches();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Batches</h1>
      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({
            code: "",
            name: "",
            academic_year: "",
            session_type: "",
            start_date: "",
            end_date: "",
          });
          setEditId(null);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "+ Add Batch"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow my-6 space-y-4">
          <input type="text" placeholder="Code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="w-full border px-3 py-2 rounded" required />
          <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border px-3 py-2 rounded" required />
          <input type="text" placeholder="Academic Year" value={formData.academic_year} onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })} className="w-full border px-3 py-2 rounded" required />
          <input type="text" placeholder="Session Type" value={formData.session_type} onChange={(e) => setFormData({ ...formData, session_type: e.target.value })} className="w-full border px-3 py-2 rounded" required />
          <input type="date" placeholder="Start Date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} className="w-full border px-3 py-2 rounded" required />
          <input type="date" placeholder="End Date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} className="w-full border px-3 py-2 rounded" required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{editId ? "Update" : "Save"}</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white p-4 rounded shadow border hover:shadow-md transition">
            <h2 className="text-lg font-bold">{batch.name}</h2>
            <p className="text-gray-600">Code: {batch.code}</p>
            <p className="text-gray-600">Year: {batch.academic_year}</p>
            <p className="text-gray-600">Type: {batch.session_type}</p>
            <p className="text-gray-600">Start: {batch.start_date}</p>
            <p className="text-gray-600">End: {batch.end_date}</p>
            <div className="flex space-x-2 mt-3">
              <button onClick={() => handleEdit(batch)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(batch.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Batches;
