import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(employerId) {
    return apiClient.get(`employers/${employerId}/duty`, {
      headers: authHeader(),
    });
  },

  get(employerId, id) {
    return apiClient.get(`employers/${employerId}/duty/${id}`, {
      headers: authHeader(),
    });
  },

  create(employerId, data) {
    return apiClient.post(`employers/${employerId}/duty`, data, {
      headers: authHeader(),
    });
  },

  update(employerId, id, data) {
    return apiClient.put(`employers/${employerId}/duty/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(employerId, id) {
    return apiClient.delete(`employers/${employerId}/duty/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(employerId) {
    return apiClient.delete(`employers/${employerId}/duty`, {
      headers: authHeader(),
    });
  },
};
