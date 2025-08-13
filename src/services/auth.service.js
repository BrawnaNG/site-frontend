import axiosInstance from "./api";
import tokenService from "./token.service";
import TokenService from "./token.service";

class AuthService {
  async login(authStore, user) {
    await axiosInstance.post( 'token/', {
      username: user.username,
      email: user.email,
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
          this.clear(authStore);
          return Promise.reject();
        }
      },
      (_error) => {
      this.clear(authStore);
        return Promise.reject();
      }
    )
  }

  async logout(authStore) {
    this.clear(authStore);
    await this.getRole(authStore);
  }

  async getRole(authStore) {
    await axiosInstance.get("accounts/role/").then(
      (response) => {
        authStore.setRole(response.data.role);
        return Promise.resolve();
      },
      (_error) => {
        authStore.setRole("reader");
        this.clear(authStore);
        return Promise.resolve();
      }
    );
  }

  clear(authStore){
    TokenService.clearRefreshToken();
    authStore.setToken(null);
    authStore.setAuthenticated(false);
  }

  async register(_authStore, user) {
    return await axiosInstance.post('accounts/registration/', {
      username: user.username,
      email: user.email,
      password: user.password,
      alias: user.alias
    });
  }  

  async resetPassword(_authStore, email) {
    return await axiosInstance.post('accounts/reset-password/', {
      email: email
    });
  }

  async setNewPassword(resetToken, password){
    return await axiosInstance.post(`accounts/apply-reset-password/`, {
      token: resetToken,
      password: password
    });
  }

  async activateUser(activationToken) {
    return await axiosInstance.get(`accounts/activation/${activationToken}/`);
  }
}

export default new AuthService();
