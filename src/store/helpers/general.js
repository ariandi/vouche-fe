import Axios from 'axios'

export function initialize(store, router) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.state.currentUser;
    if(requiresAuth && !currentUser) {
      next('/login');
    } else if(to.path === '/' && currentUser) {
      next('/chat-room');
    } else {
      next();
    }
  });

  Axios.interceptors.response.use(null, (error) => {
    if (error.response.status === 401) {
      store.commit('logout');
      router.push('/login');
    }

    return Promise.reject(error);
  });

  if (store.getters.currentUser) {
    setAuthorization(store.getters.currentUser.token);
  }
}

export function setAuthorization(token) {
  Axios.defaults.headers.common["Authorization"] = `Basic ${token}`
}
