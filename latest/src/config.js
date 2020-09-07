const hostname = window.location.hostname;

const api = {
  localhost: "http://127.0.0.1:8000",
  platform: "http://3.128.47.140",
  // platform: 'http://***REMOVED_HOST***:30003'
};

let apiBase = "";
if (hostname === "localhost") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}
export default apiBase;
