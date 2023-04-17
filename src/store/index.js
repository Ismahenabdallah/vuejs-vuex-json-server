import axios from 'axios'
import { createStore } from 'vuex'
import router from '../router/index'
const state = {
  user: JSON.parse(localStorage.getItem('user-info')),
  isUserLoggIn: "",
  LoggedUserId: "",
  numofCategories: "",
  ListCategories: [],

}
//get data 
const getters = {



}

//mounted
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload })
  },
  isUserLoggInFunction(state) {
    if (state.user) {
      state.isUserLoggIn = true
      state.LoggedUserId = state.user.id
      console.log("LoggedUserId", state.LoggedUserId)
    } else {
      state.isUserLoggIn = false
      router.push({ name: "LoginPage" })
    }
  },
  async displayAllCategories(state, payload) {
    let result = await axios.get(`http://localhost:3000/categories?userId=${payload.userIdPayload}&restaurentId=${payload.restaurentIdPayload}`);
    if (result.status == 200) {
      state.ListCategories = result.data;
      state.numofCategories = state.ListCategories.length;
      //console.log("ddd",state.ListCategories)
    }
  },


}
//methods
const actions = {
  redirectTo({ commit }, payload) {
    commit('redirectTo', payload.val)
  },



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
