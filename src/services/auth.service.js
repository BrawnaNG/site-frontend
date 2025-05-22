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
    //Edge case when users are deleted from database, e.g. on migration, but they have a valid token
    if (authStore.isAuthenticated && !authStore.authenticationFailed){
      this.handleRefreshFailure(authStore);
      return Promise.reject("Cannot use refresh token");
    }

    // If already refreshing, chain this request to the existing refresh call
    if (authStore.isRefreshing) {
      return authStore.refreshingCall.then(cb);
    }

    const refreshToken = TokenService.getLocalRefreshToken();
    if (!refreshToken) {
      this.handleRefreshFailure(authStore);
      return Promise.reject("No refresh token available");
    }

    // Set refreshing state
    authStore.setRefreshingState(true);
    
    try {
      // Attempt to refresh the token
      const refreshingCall = axiosInstance.post("token/refresh/", {
        refresh: refreshToken
      }).then(response => {
        // Success - update token and state
        const newAccessToken = response.data.access;
        TokenService.updateLocalAccessToken(newAccessToken);
        authStore.setToken(newAccessToken);
        authStore.setAuthenticated(true);
        authStore.setRefreshingState(false);
        return newAccessToken;
      }).catch(error => {
        // Refresh failed - clear authentication
        this.handleRefreshFailure(authStore);
        throw error;
      }).then(cb);
      
      // Store the refreshing call for potential chaining
      authStore.setRefreshingCall(refreshingCall);
      return refreshingCall;
    } catch (error) {
      this.handleRefreshFailure(authStore);
      return Promise.reject(error);
    }
  }

  // Helper method to handle refresh failures
  handleRefreshFailure(authStore) {
    authStore.setRefreshingState(false);
    authStore.setRefreshingCall(undefined);
    authStore.setToken(null);
    authStore.setAuthenticated(false);
    authStore.setAuthenticationFailed(true);
    TokenService.removeUser();
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
