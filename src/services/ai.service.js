import authHeader from "./auth.header";
import apiClient from "./services";

export default {
  getObjective(request) {
    return apiClient.get(`ai/`, {
      headers: authHeader(),
    });
  },

};