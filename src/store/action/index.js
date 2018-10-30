/**
 * Created by 56234 on 2018/10/30.
 */

export default {
  saveHistory({commit}, data) {
    commit('MT_HISTORY', data)
  }
}
