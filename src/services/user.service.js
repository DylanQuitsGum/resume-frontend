import authHeader from "./auth.header";
import apiClient from "./services";

export default {

  get(userId) {
    return apiClient.get(`users/${userId}`, {
      headers: authHeader(),
    });
  },

  update(userId, data) {
    console.log('update');
    return apiClient.put(`users/${userId}`, data, {
      headers: authHeader(),
    });
  },

};
