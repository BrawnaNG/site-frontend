import axiosInstance from "./api";
import AuthService from "./auth.service";
import { useAuthStore } from "../stores/auth";
import tokenService from "./token.service";
import authService from "./auth.service";

const setup = () => {
  const authStore = useAuthStore();
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (config.url.startsWith("token")){
        return config;
      }
      let token = authStore.token;      
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
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try{
          const refreshToken = tokenService.getLocalRefreshToken();
          const res = await axiosInstance.post('token/refresh/', { refresh: refreshToken });
          const { access, refresh } = res.data;
          authStore.setToken(access);
          authStore.setAuthenticated(true);
          await authService.getRole(authStore);
          if (refresh){
            tokenService.updateRefreshToken(refresh);
          }
          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          authService.logout();
          return Promise.reject(refreshError);
        } 
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
