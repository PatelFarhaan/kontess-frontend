const hostname = window.location.hostname;

const api = {
  localhost: 'http://localhost:8000/',
};

const apiBase = api[hostname];

export default apiBase;
