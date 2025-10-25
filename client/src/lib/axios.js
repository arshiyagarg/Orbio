import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:8080" : process.env.BACKEND_URL,
  withCredentials: true,
});