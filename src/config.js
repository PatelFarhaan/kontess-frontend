const hostname = window.location.hostname;

const api = {
  localhost: "http://localhost:8000",
  platform: "http://api.platform.kontess.com"
};
console.log(window.location.hostname);

let apiBase = "";
if (hostname == "localhost") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}

export default apiBase;
