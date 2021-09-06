import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { getLocalUser, getToken } from './helpers/auth';

Vue.use(Vuex)

const user = getLocalUser();
const token = getToken();

export default new Vuex.Store({
  state: {
    status: '',
    currentUser: user,
    currentToken: token,
    loading: false,
    auth_error: null,
    isLoggedIn: !!user,
    header: null,
  },
  mutations: {
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    loadingFinish(state) {
      state.loading = false;
    },
    loginSuccess(state, payload) {
      state.auth_error = null;
      state.isLoggedIn = true;
      state.loading = false;
      state.currentUser = Object.assign({}, payload.data);
      state.currentToken = payload.token;
      localStorage.setItem('uservouch', JSON.stringify(state.currentUser));
      localStorage.setItem('tokenvouch', payload.token);
    },
    loginFailed(state, payload) {
      state.loading = false
      state.auth_error = payload
    },
    logout(state) {
      localStorage.removeItem('uservouch');
      localStorage.removeItem('tokenvouch');
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('uservouch')
        localStorage.removeItem('tokenvouch')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    loadingFinish(context) {
      context.commit('loadingFinish');
    }
  },
  modules: {},
  getters: {
    isLoading(state) {
      return state.loading;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    currentToken(state) {
      return state.currentToken;
    },
    authError(state) {
      return state.auth_error;
    },
  }
});
