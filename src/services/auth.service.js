import axiosInstance from "./api";
import TokenService from "./token.service";

class AuthService {
  async login(authStore, user) {
    await axiosInstance.post( 'token/', {
      username: user.username,
      password: user.password
    }).then(
      (response) => {
        if (response.data.access) {
          localStorage.setItem('user', JSON.stringify(response.data));
          authStore.setToken(response.data.access);
          authStore.setAuthenticated(true);
          authStore.setAuthenticationFailed(false);
          return Promise.resolve();
        }
        else{
          TokenService.removeUser();
          authStore.setToken(null);
          authStore.setAuthenticated(false);
          authStore.setAuthenticationFailed(false);
          return Promise.reject();
        }
      },
      (_error) => {
        TokenService.removeUser();
        authStore.setToken(null);
        authStore.setAuthenticated(false);
        authStore.setAuthenticationFailed(true);
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

  async refreshToken(authStore, cb) {
    if (authStore.isRefreshing) {
        const chained = authStore.refreshingCall.then(cb);
        authStore.setRefreshingCall(chained);
        return chained;
    }
    const token = TokenService.getLocalAccessToken();
    if (token){
      authStore.setRefreshingState(true);
      const refreshingCall = axiosInstance.post("token/verify/", {
        token: token
      }).then(
        (_) => {
          authStore.setToken(token);
          authStore.setAuthenticated(true);
          authStore.setRefreshingState(false);
          authStore.setRefreshingCall(undefined);
          return Promise.resolve(token);
        },
        async (_error) => {
          const refreshToken = TokenService.getLocalRefreshToken();
          if (refreshToken){
            await axiosInstance.post("token/refresh/", {
              refresh: refreshToken,
              token: refreshToken
            }).then(
              (response) =>{
                const access = response.data.access;
                TokenService.updateLocalAccessToken(access);
                authStore.setToken(access);
                authStore.setAuthenticated(true);
                authStore.setRefreshingState(false);
                authStore.setRefreshingCall(undefined);
                return Promise.resolve(access);
              },
              _error =>{
                authStore.setRefreshingState(false);
                authStore.setAuthenticationFailed(true);
                TokenService.removeUser();
                return Promise.reject();
              }
            )
            .catch(
              (_error) => {
                authStore.setRefreshingState(false);
                authStore.setAuthenticationFailed(true);
                TokenService.removeUser();
                return Promise.reject();
              }
            )
          }
          else{
            authStore.setRefreshingState(false);
            authStore.setAuthenticationFailed(true);
            TokenService.removeUser();
            return Promise.reject();
          }
        }
      )
      .catch(
        (_error) => {
          authStore.setRefreshingState(false);
          authStore.setAuthenticationFailed(true);
          TokenService.removeUser();
          return Promise.reject();
        }
      )
      .then(cb);
      authStore.setRefreshingCall(refreshingCall);
      return refreshingCall;
    }
    authStore.setAuthenticationFailed(true);
    authStore.setRefreshingState(false);
    TokenService.removeUser();
    return Promise.reject();
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
