const hostname = window.location.hostname;

const api = {
  localhost: "http://127.0.0.1:8000",
  platform: "https://demo.kontess.com",
  // platform: 'http://***REMOVED_HOST***:30003'
};

let apiBase = "";
if (hostname === "localhost") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}
export default apiBase;
