const hostname = window.location.hostname;

const api = {
  localhost: "http://localhost:8000",
  platform: "http://ec2-3-84-221-221.compute-1.amazonaws.com"
};

let apiBase = "";
// if (hostname == "localhost") {
// apiBase = api.localhost;
// } else {
apiBase = api.platform;
// }

export default apiBase;
