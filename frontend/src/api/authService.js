import axios from "axios";
const apiURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${apiURL}/api/users`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};
