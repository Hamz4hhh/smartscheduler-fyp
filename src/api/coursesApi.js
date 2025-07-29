import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/courses/";

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
