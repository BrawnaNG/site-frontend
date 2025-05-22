import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false,
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
        
    setRole(role) {
      this.role = {
        isInit: role ? true : false,
        isAdmin: (role === "administrator"),
        isAuthor: (role === "author")
      };
      return role;
    },
  }
});
