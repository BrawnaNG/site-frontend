import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user, role: null }
  : { status: { loggedIn: false }, user: null, role: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshToken({ commit }, accessToken) {
        commit('refreshToken', accessToken);
    },
    refreshRole({commit }){
        return AuthService.getRole().then(
            role => {
                commit('refreshRole', role);
                return Promise.resolve(role);
            },
            error => {
              commit('registerFailure');
              return Promise.reject(error);
            }
        )
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
    refreshRole(state, role){
      state.role = {
        isAdmin: (role === "administrator"),
        isAuthor: (role === "author")
      };
    }
  }
};