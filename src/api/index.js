import axios from "axios";

const baseURL = "http://localhost:4000/api";
const token = localStorage.getItem("token");
export const api = axios.create({
  baseURL: baseURL,
  headers: { authorization: token },
});
