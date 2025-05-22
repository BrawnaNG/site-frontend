import axiosInstance from "./api";
import tokenService from "./token.service";
import TokenService from "./token.service";

class AuthService {
  async login(authStore, user) {
    await axiosInstance.post( 'token/', {
      username: user.username,
      password: user.password
    }).then(
      async (response) => {
        if (response.data.access) {
          authStore.setToken(response.data.access);
          tokenService.updateRefreshToken(response.data.refresh);
          authStore.setAuthenticated(true);
          await this.getRole(authStore);
          return Promise.resolve();
        }
        else{
          TokenService.clearRefreshToken();
          authStore.setToken(null);
          authStore.setAuthenticated(false);
          return Promise.reject();
        }
      },
      (_error) => {
        TokenService.clearRefreshToken();
        authStore.setToken(null);
        authStore.setAuthenticated(false);
        return Promise.reject();
      }
    )
  }

  logout(authStore) {
    TokenService.removeUser();
    authStore.setToken(null);
    authStore.setAuthenticated(false);
  }

  async getRole(authStore) {
    await axiosInstance.get("accounts/role/").then(
      (response) => {
        authStore.setRole(response.data.role);
        return Promise.resolve();
      },
      (_error) => {
        authStore.setRole("reader");
        return Promise.resolve();
      }
    );
  }

  async register(_authStore, user) {
    return await axiosInstance.post('accounts/registration/', {
      username: user.username,
      email: user.email,
      password: user.password,
      alias: user.alias
    });
  }  
}

export default new AuthService();
