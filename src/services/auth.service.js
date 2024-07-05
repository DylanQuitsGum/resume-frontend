import apiClient from "./services";

export default {
  signin(user) {
    return apiClient
      .post('auth/signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  },
  async signout() {
    console.log('signout')
    localStorage.removeItem("user");
  },
  async register(user) {
    return await apiClient.post("auth/signup", user);
  },
  async currentUser() {
    localStorage.removeItem('user');
    return localStorage.getItem("user");
  }
};
