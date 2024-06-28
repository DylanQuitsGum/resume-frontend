import apiClient from "./services";

export default {
  async signup(userObject){
    return await apiClient.post("auth/signup",userObject.value);
  },
  async signin(loginObject){
    return await apiClient.post("auth/signin", loginObject.value);
  },
  loginUser(user) {
    console.log(user);
    return apiClient.post("login", user.value, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization:
          "Basic " + btoa(user.value.email + ":" + user.value.password),
      },
    });
  },
  logoutUser() {
    localStorage.removeItem("user");
  },
};
