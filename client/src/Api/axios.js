import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:5500/api",
  baseURL: "https://evangadi-forum-nyfj.onrender.com",
});
export default instance;
