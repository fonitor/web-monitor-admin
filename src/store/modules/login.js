export default {
    state: {
        isLogin: false
    },
    mutations: {
        SET_LOGIN: (state, view) => {
            state.isLogin = view
        },
    },
    actions: {
        LOGIN({ commit }, view) {
            console.log('显示服务 --- ', view)
            commit('SET_LOGIN', view)
        }
    }
}