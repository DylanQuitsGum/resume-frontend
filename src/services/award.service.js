import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get(`users/${userId}/award`, {
      headers: authHeader(),
    });
  },

  get(userId, id) {
    return apiClient.get(`users/${userId}/award/${id}`, {
      headers: authHeader(),
    });
  },

  create(userId, data) {
    return apiClient.post(`users/${userId}/award`, data, {
      headers: authHeader(),
    });
  },

  update(userId, id, data) {
    return apiClient.put(`users/${userId}/award/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(userId, id) {
    return apiClient.delete(`users/${userId}/award/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(userId) {
    return apiClient.delete(`users/${userId}/award`, {
      headers: authHeader(),
    });
  },
};
