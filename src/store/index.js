import { createStore } from 'vuex'
import router from '../router/index'
const state = {
  user: JSON.parse(localStorage.getItem('user-info')),
}
const getters = {
  getUser: state => state.user,


}
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload })
  },
  SET_USER(state, user) {
    state.user = user
  }


}
const actions = {
  redirectTo({ commit }, payload) {
    commit('redirectTo', payload.val)
  },
  saveUser({ commit }, user) {
    commit('SET_USER', user)
  }


}
const modules = {
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})
