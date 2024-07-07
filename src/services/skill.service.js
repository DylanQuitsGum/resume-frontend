import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get(`users/${userId}/skill`, {
      headers: authHeader(),
    });
  },

  get(userId, id) {
    return apiClient.get(`users/${userId}/skill/${id}`, {
      headers: authHeader(),
    });
  },

  create(userId, data) {
    return apiClient.post(`users/${userId}/skill`, data, {
      headers: authHeader(),
    });
  },

  update(userId, id, data) {
    return apiClient.put(`users/${userId}/skill/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(userId, id) {
    return apiClient.delete(`users/${userId}/skill/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(userId) {
    return apiClient.delete(`users/${userId}/skill`, {
      headers: authHeader(),
    });
  },
};
