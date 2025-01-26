// src/utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://food-delivery-backend-intern-1.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
