
const initialState = {
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
};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    setToken( { commit }, token ) {
      commit('setToken', token);
      return token;
    },
    setAuthenticated( { commit }, authenticated ) {
      commit('setAuthenticated', authenticated);
      return authenticated;
    },
    setRefreshingState( { commit }, refreshingState ) {
      commit('setRefreshingState', refreshingState);
      return refreshingState;
    },
    setRefreshingCall( { commit }, refreshingCall ) {
      commit('setRefreshingCall', refreshingCall);
      return refreshingCall;
    },
    setRole({ commit }, role ) {
      commit('setRole', role);
      return role;
    },
    setAuthenticationFailed( { commit }, authenticationFailed ) {
      commit('setAuthenticationFailed', authenticationFailed);
      return authenticationFailed;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated  = isAuthenticated;
    },
    setRefreshingState(state, isRefreshing) {
      state.isRefreshing  = isRefreshing;
    },
    setRefreshingCall(state, refreshingCall) {
      state.refreshingCall  = refreshingCall;
    },
    setRole(state, role){
      state.role = {
        isInit: role ? true : false,
        isAdmin: (role === "administrator"),
        isAuthor: (role === "author")
      };
    },
    setAuthenticationFailed(state, authenticationFailed){
      state.authenticationFailed = authenticationFailed
    }
  }
};