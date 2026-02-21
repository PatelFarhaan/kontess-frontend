/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
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
