import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { getLocalUser, getToken, logout } from './helpers/auth';
import { getAllChatByRoom } from './helpers/chats';

Vue.use(Vuex)

let user = getLocalUser();
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
    chatData: [],
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
      user = state.currentUser;
      localStorage.setItem('uservouch', JSON.stringify(state.currentUser));
      localStorage.setItem('tokenvouch', payload.token);
    },
    loginFailed(state, payload) {
      state.loading = false
      state.auth_error = payload
    },
    getChatByRoom(state, payload) {
      state.chatData = payload.data;
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
    async logout({ commit }, payload) {
      try {
        await logout(payload, user.id);
        await commit('logout');
        delete axios.defaults.headers.common['Authorization'];
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
    async getChatByRoom(context, payload) {
      try {
        let response = await getAllChatByRoom(payload);
        context.commit('getChatByRoom', response);
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
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
    chatData(state) {
      return state.chatData;
    },
  }
});
