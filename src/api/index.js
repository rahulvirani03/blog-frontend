import axios from "axios";
const localURL = "http://localhost:4000";
const deployedURL = "https://blogg-backend.herokuapp.com";
const baseURL = `${localURL}/api`;

const token = localStorage.getItem("token");
export const api = axios.create({
  baseURL: baseURL,
  headers: { authorization: token },
});
