import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isRefreshing: false,
    refreshingCall: null,
    token: null,
    isAuthenticated: false,
    authenticationFailed: false,
    role: {
      isInit: false,
      isAdmin: false,
      isAuthor: false
    }
  }),
  
  getters: {
    // Add getters if needed
  },
  
  actions: {
    setToken(token) {
      this.token = token;
      return token;
    },
    
    setAuthenticated(authenticated) {
      this.isAuthenticated = authenticated;
      return authenticated;
    },
    
    setRefreshingState(refreshingState) {
      this.isRefreshing = refreshingState;
      return refreshingState;
    },
    
    setRefreshingCall(refreshingCall) {
      this.refreshingCall = refreshingCall;
      return refreshingCall;
    },
    
    setRole(role) {
      this.role = {
        isInit: role ? true : false,
        isAdmin: (role === "administrator"),
        isAuthor: (role === "author")
      };
      return role;
    },
    
    setAuthenticationFailed(authenticationFailed) {
      this.authenticationFailed = authenticationFailed;
      return authenticationFailed;
    }
  }
});
