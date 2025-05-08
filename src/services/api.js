import axios from "axios";

const instance = axios.create({
//  baseURL: "http://localhost:8000/api/v1/",
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
