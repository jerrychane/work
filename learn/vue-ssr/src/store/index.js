// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { getData } from '@/api/data'

export function createStore () {
  return new Vuex.Store({
    state: {
      lists: []
    },
    actions: {
      // fetchItem ({ commit }, id) {
      //   // `store.dispatch()` 会返回 Promise，
      //   // 以便我们能够知道数据在何时更新
      //   return fetchItem(id).then(item => {
      //     commit('setItem', { id, item })
      //   })
      // }
      getDataAction ({ commit }) {
        console.log('getDataAction -> commit', commit)
        getData().then((res) => {
          console.log(res);
          commit('setData', res)
        })

      }
    },
    mutations: {
      // setItem (state, { id, item }) {
      //   Vue.set(state.items, id, item)
      // }
      setData (state, data) {
        state.lists = data
      }
    }
  })
}