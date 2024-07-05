import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get(`users/${userId}/education`, {
      headers: authHeader(),
    });
  },

  get(userId, id) {
    return apiClient.get(`users/${userId}/education/${id}`, {
      headers: authHeader(),
    });
  },

  create(userId, data) {
    return apiClient.post(`users/${userId}/education`, data, {
      headers: authHeader(),
    });
  },

  update(userId, id, data) {
    return apiClient.put(`users/${userId}/education/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(userId, id) {
    return apiClient.delete(`users/${userId}/education/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(userId) {
    return apiClient.delete(`users/${userId}/education`, {
      headers: authHeader(),
    });
  },
};
