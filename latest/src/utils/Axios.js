import axios from "axios";

var baseURL = (process.env.REACT_APP_API_URL || "http://localhost:8000") + "/api/";
const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
    "X-Authorization-Token": `bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default Axios;
