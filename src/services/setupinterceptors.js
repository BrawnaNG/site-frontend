import axiosInstance from "./api";
import AuthService from "./auth.service";
import { useAuthStore } from "../stores/auth";

const setup = () => {
  const authStore = useAuthStore();
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.url.startsWith("token")){
        return config;
      }
      const token = authStore.token;
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const url = error.config.url;
      
      // Only attempt token refresh for 401 errors on non-token endpoints
      if (status === 401 && !url.startsWith("token")) {
        // Don't attempt refresh if authentication has already failed
        if (!authStore.authenticationFailed) {
          try {
            // Try to refresh the token and retry the original request
            await AuthService.refreshToken(authStore, token => {
              // Update the failed request with the new token
              error.config.headers['Authorization'] = 'Bearer ' + token;
              // Prevent axios from using the baseURL again since it's already in the URL
              error.config.baseURL = undefined;
              // Retry the original request with the new token
              return axiosInstance.request(error.config);
            });
          } catch (refreshError) {
            // Token refresh failed, continue with rejection
            console.log("Token refresh failed:", refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
