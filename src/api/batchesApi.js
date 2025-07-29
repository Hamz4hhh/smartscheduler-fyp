import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/batches/";

export const getBatches = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBatch = async (batch) => {
  const response = await axios.post(API_URL, batch);
  return response.data;
};

export const updateBatch = async (id, batch) => {
  const response = await axios.put(`${API_URL}${id}`, batch);
  return response.data;
};

export const deleteBatch = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`);
  return response.data;
};
