import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/rooms/";

export const getRooms = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addRoom = async (room) => {
  const response = await axios.post(API_URL, room);
  return response.data;
};

export const updateRoom = async (id, room) => {
  const response = await axios.put(`${API_URL}${id}`, room);
  return response.data;
};

export const deleteRoom = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
};
