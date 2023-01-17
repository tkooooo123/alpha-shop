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
      role: ''
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
        console.log('data', data.currentUser)
        const { id, name, email, role } = data.currentUser
        commit('setCurrentUser', {
          id,
          name, 
          email,
          role
        })
      } catch (error) {
        console.log('error', error.message)
      }
    }
  },
  modules: {
  }
})
