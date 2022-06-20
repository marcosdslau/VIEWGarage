export default {
    state: {
        user: {}
        
    },
    mutations:{
        setUser(state, payload){
            state.user = payload;
        },
    },
    actions:{
        addUser({ commit }, payload){
            commit('setUser', payload)
        }
       
    },
    getters: {
        getUser(state){
            return state.user
        }
    }
}
