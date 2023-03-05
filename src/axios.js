import axios from 'axios'
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: 'http://localhost:8000/api/'
})
api.defaults.headers.common["Authorization"] = `Bearer ${token}`;



export default api