import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/instructors/";

export const getInstructors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addInstructor = async (instructor) => {
  const response = await axios.post(API_URL, instructor);
  return response.data;
};

export const updateInstructor = async (id, instructor) => {
  const response = await axios.put(`${API_URL}${id}`, instructor);
  return response.data;
};

export const deleteInstructor = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
};
