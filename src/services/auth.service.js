import apiClient from "./services";

export default {
  async signin(user) {
    return await apiClient.post("auth/signin", {
      email: user.email,
      password: user.password,
    });
  },
  async signout(){
    localStorage.removeItem('user');
  },
  async register(user) {
    return await apiClient.post("auth/signup", user);
  },
};
