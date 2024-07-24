import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getAll(educationId) {
    return apiClient.get(`education/${educationId}/course`, {
      headers: authHeader(),
    });
  },

  get(educationId, id) {
    return apiClient.get(`education/${educationId}/course/${id}`, {
      headers: authHeader(),
    });
  },

  create(educationId, data) {
    return apiClient.post(`education/${educationId}/course`, data, {
      headers: authHeader(),
    });
  },

  update(educationId, id, data) {
    return apiClient.put(`education/${educationId}/course/${id}`, data, {
      headers: authHeader(),
    });
  },

  delete(educationId, id) {
    return apiClient.delete(`education/${educationId}/course/${id}`, {
      headers: authHeader(),
    });
  },

  deleteAll(educationId) {
    return apiClient.delete(`education/${educationId}/course`, {
      headers: authHeader(),
    });
  },
};
