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
    (error) => {
      const status = error.response?.status;
      const url = error.config.url;
      if (status === 401 && !url.startsWith("token")) {
        const authenticationFailed = authStore.authenticationFailed;
        if (!authenticationFailed){
          return AuthService.refreshToken(authStore, _ => {
            error.config.headers['Authorization'] = 'Bearer ' + authStore.token;
            error.config.baseURL = undefined;
            return axiosInstance.request(error.config);
          });
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
