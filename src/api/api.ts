import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-backend-cdju.onrender.com",
});

export default API;