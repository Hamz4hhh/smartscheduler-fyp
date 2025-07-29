import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/slots/";

export const getSlots = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addSlot = async (slot) => {
  const response = await axios.post(API_URL, slot);
  return response.data;
};

export const updateSlot = async (id, slot) => {
  const response = await axios.put(`${API_URL}${id}`, slot);
  return response.data;
};

export const deleteSlot = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
};
