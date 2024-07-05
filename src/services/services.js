import axios from "axios";

var serverMode = import.meta.env.SSR;

console.log(serverMode);

var baseurl = "";
if (!serverMode) {
  baseurl = "http://localhost:3201/resumeapi/";
} else {
  baseurl = "https://3.142.71.232:3201/resumeapi/";
}

console.log(baseurl);

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
// apiClient.interceptors.request.use(
//   (config) => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       if (user.accessToken) {
//         config.headers.Authorization = `Bearer ${user.accessToken}`;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default apiClient;