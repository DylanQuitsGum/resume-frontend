import authHeader from "./auth.header";
import apiClient from "./services";

export default {

  getObjective(data) {
    return apiClient.post(`ai/`, data, {
      headers: authHeader(),
    });
  },
};
