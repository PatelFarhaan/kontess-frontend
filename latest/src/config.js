const hostname = window.location.hostname;

const api = {
  localhost: process.env.REACT_APP_API_URL || "http://localhost:8000",
  platform: process.env.REACT_APP_API_URL || "https://" + hostname,
};

let apiBase = "";
if (hostname === "localhost") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}

export default apiBase;
