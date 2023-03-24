import axios from "axios";
const token = localStorage.getItem("token");
const localhost = "http://localhost:8000";
const api = axios.create({
  baseURL: `${localhost}/api/`,
});
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
