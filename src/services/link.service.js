import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(userId) {
    return apiClient.get(`users/${userId}/link`, {
      headers: authHeader(),
    });
  },

  get(userId, id) {
    return apiClient.get(`users/${userId}/link/${id}`, {
      headers: authHeader(),
    });
  },

  create(userId, data) {
    return apiClient.post(`users/${userId}/link`, data, {
      headers: authHeader(),
    });
  },

  update(userId, id, data) {
    return apiClient.put(`users/${userId}/link/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(userId, id) {
    return apiClient.delete(`users/${userId}/link/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(userId) {
    return apiClient.delete(`users/${userId}/experience`, {
      headers: authHeader(),
    });
  },
};
