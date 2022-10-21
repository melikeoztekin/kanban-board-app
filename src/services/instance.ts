import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:80/",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export default instance;
