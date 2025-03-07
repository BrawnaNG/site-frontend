import { error } from "jquery";
import axiosInstance from "./api";
import TokenService from "./token.service";

class AuthService {
  async login(store, user) {
    await axiosInstance.post( 'token/', {
      username: user.username,
      password: user.password
    }).then(
      (response) => {
        if (response.data.access) {
          localStorage.setItem('user', JSON.stringify(response.data));
          store.dispatch('auth/setToken', response.data.access);
          store.dispatch('auth/setAuthenticated', true);
          store.dispatch('auth/setAuthenticationFailed', false);
          return Promise.resolve();
        }
        else{
          TokenService.removeUser();
          store.dispatch('auth/setToken', null);
          store.dispatch('auth/setAuthenticated', false);
          store.dispatch('auth/setAuthenticationFailed', false);
          return Promise.reject();
        }
      },
      (_error) => {
        TokenService.removeUser();
        store.dispatch('auth/setToken', null);
        store.dispatch('auth/setAuthenticated', false);
        store.dispatch('auth/setAuthenticationFailed', true);
        return Promise.reject();
      }
    )
  }

  logout(store) {
    TokenService.removeUser();
    store.dispatch('auth/setToken', null);
    store.dispatch('auth/setAuthenticated', false);
  }

  async getRole(store) {
    await axiosInstance.get("accounts/role/").then(
      (response) => {
        store.dispatch("auth/setRole", response.data.role);
        return Promise.resolve(); 
      },
      (error) => {
        store.dispatch("auth/setRole", "reader");
        return Promise.resolve();
      }
    );
  }

  async refreshToken(store, cb) {
    if (store.state.auth.isRefreshing) {
        const chained = store.state.auth.refreshingCall.then(cb);
        store.dispatch('auth/setRefreshingCall', chained);
        return chained;
    }
    const token = TokenService.getLocalAccessToken();
    if (token){
      store.dispatch('auth/setRefreshingState', true);
      const refreshingCall = axiosInstance.post("token/verify/", {
        token: token
      }).then(
        (_) => {
          store.dispatch('auth/setToken', token);
          store.dispatch('auth/setAuthenticated', true);
          store.dispatch('auth/setRefreshingState', false);
          store.dispatch('auth/setRefreshingCall', undefined);
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
                store.dispatch('auth/setToken', access);
                store.dispatch('auth/setAuthenticated', true);
                store.dispatch('auth/setRefreshingState', false);
                store.dispatch('auth/setRefreshingCall', undefined);
                return Promise.resolve(access);
              },
              _error =>{
                store.dispatch('auth/setRefreshingState', false);
                store.dispatch('auth/setAuthenticationFailed', true);
                TokenService.removeUser();
                return Promise.reject();
              }
            )
            .catch(
              (_error) => {
                store.dispatch('auth/setRefreshingState', false);
                store.dispatch('auth/setAuthenticationFailed', true);
                TokenService.removeUser();
                return Promise.reject();
              }
            )
          }
          else{
            store.dispatch('auth/setRefreshingState', false);
            store.dispatch('auth/setAuthenticationFailed', true);
            TokenService.removeUser();
            return Promise.reject();
          }
        }
      )
      .catch(
        (_error) => {
          store.dispatch('auth/setRefreshingState', false);
          store.dispatch('auth/setAuthenticationFailed', true);
          TokenService.removeUser();
          return Promise.reject();
        }
      )
      .then(cb);
      store.dispatch('auth/setRefreshingCall', refreshingCall);
      return refreshingCall;
    }
    store.dispatch('auth/setAuthenticationFailed', true);
    store.dispatch('auth/setRefreshingState', false);
    TokenService.removeUser();
    return Promise.reject();
  }

  async register(user) {
    return await axiosInstance.post('accounts/registration/', {
      username: user.username,
      email: user.email,
      password: user.password,
      alias: user.alias
    });
  }  
}

export default new AuthService();