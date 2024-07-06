import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get(`users/${userId}/employer`, {
      headers: authHeader(),
    });
  },

  get(userId, id) {
    return apiClient.get(`users/${userId}/employer/${id}`, {
      headers: authHeader(),
    });
  },

  create(userId, data) {
    return apiClient.post(`users/${userId}/employer`, data, {
      headers: authHeader(),
    });
  },

  update(userId, id, data) {
    return apiClient.put(`users/${userId}/employer/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(userId, id) {
    return apiClient.delete(`users/${userId}/employer/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(userId) {
    return apiClient.delete(`users/${userId}/employer`, {
      headers: authHeader(),
    });
  },
};
