const hostname = window.location.hostname;

const api = {
  localhost: "http://localhost:8000",
  platform: "https://platform-api.kontess.com"
};

let apiBase = "";
if (hostname == "localhost") {
  apiBase = api.localhost;
} else {
  apiBase = api.platform;
}

export default apiBase;
