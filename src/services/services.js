import axios from "axios";

var baseurl = (process.env.NODE_ENV === "development")
                        ? baseurl = "http://localhost:3201/resumeapi/"
                        : baseurl = "https://107.23.63.118:3201/resumeapi/";

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;