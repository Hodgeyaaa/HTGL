import { createStore } from 'vuex'
import app from './modules/app.js'
import getters from './getters'

export default createStore({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  getters,
  modules: {
    app
  }
})
