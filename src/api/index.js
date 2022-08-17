import axios from "axios";
// const localURL = "http://localhost:4000";
const deployedURL = "https://blogg-backend.herokuapp.com";
const baseURL = `${deployedURL}/api`;
//`${localURL}/api`;
// process.env.NODE_ENV === "development"
//   ? `${localURL}/api`
//   : `${deployedURL}/api`;

const token = localStorage.getItem("token");
export const api = axios.create({
  baseURL,
  headers: { authorization: token },
});
