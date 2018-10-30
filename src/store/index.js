import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './action'
import mutations from './mutation'
import getters from './getter'

Vue.use(Vuex)

// 每个文件都写了例子
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
