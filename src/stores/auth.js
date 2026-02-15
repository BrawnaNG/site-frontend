import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    isAuthenticated: false,
    view: 'login',
    role: {
      isInit: false,
      isAdmin: false,
      isAuthor: false,
      isReader: false,
      authorStatusRequested: false,
      authorStatusDenied: false
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

    setView(view) {
      this.view = view;
      return view;
    },
    
    setAuthenticated(authenticated) {
      this.isAuthenticated = authenticated;
      return authenticated;
    },

    setAuthorStatusRequested(author_status_requested){
      this.role.authorStatusRequested = author_status_requested;
    },
        
    setRole(role, author_status_requested, author_status_denied) {
      this.role = {
        isInit: role ? true : false,
        isAdmin: (role === "administrator"),
        isAuthor: (role === "author"),
        isReader: (role === "reader"),
        authorStatusDenied: author_status_denied,
        authorStatusRequested: author_status_requested
      };
      return role;
    },
  }
});
