
const hostname = window.location.hostname;

const api = {
  localhost: 'http://localhost:8000',
  platform: "http://ucinvc.kontess.com:8000"
  // platform: 'http://***REMOVED_HOST***:30003'
};

let apiBase = '';
if (hostname === 'localhost') {
  apiBase = api.localhost;
} else {

  apiBase = api.platform;
}
export default apiBase;
