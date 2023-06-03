import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://movies-api-bd5r.onrender.com/api/",
});
