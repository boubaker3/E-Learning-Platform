import { createStore } from "vuex";
import api from "../axios";
import createPersistedState from "vuex-persistedstate";
import route from "../router";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    user: {},
    token: "",

    isAuthenticated: false,
    showLogin: false,
    showSignup: false,
    userdata: {},
  },
  actions: {
    async signup({ commit }, credentials) {
      return await api
        .post("signup", credentials, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async login({ commit }, credentials) {
      return await api
        .post("login", credentials, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          return Promise.resolve(response);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    async getUserdata({ commit }, data) {
      await api
        .get(`userdata?userid=${data.userid}`)
        .then((response) => {
          commit("SET_USERDATA", {
            userdata: response.data.userdata,
            redirect: data.redirect,
          });
          console.log(data.redirect);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = JSON.parse(user);
    },
    SET_USERDATA(state, data) {
      state.userdata = data.userdata;
      console.log(data.redirect);
      if (data.redirect == true) {
        route.push(`/profile/${state.userdata.userid}/1`);
      }
    },
    authenticate() {
      this.state.isAuthenticated = true;
    },
    logout() {
      localStorage.clear();
    },
    setLogin(state) {
      state.showLogin = !state.showLogin;
      state.showSignup = state.showSignup && false;
    },
    setSignup(state) {
      state.showSignup = !state.showSignup;
      state.showLogin = state.showLogin && false;
    },
  },
  modules: {},
});
export default store;
