import Vue from 'vue'
import Vuex from 'vuex'
import authorizationApi from '../apis/authorization'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser, 
        ...currentUser 
      }
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }){
      try {
        const  { data } = await authorizationApi.getCurrentUser()
        console.log('data', data)
        const { id, name, email, isAdmin } = data
        commit('setCurrentUser', {
          id,
          name, 
          email,
          isAdmin
        })
      } catch (error) {
        console.log('error', error.message)
      }
    }
  },
  modules: {
  }
})
