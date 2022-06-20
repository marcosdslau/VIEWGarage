export default {
    state: {
        alerts: [
            // {type:"error", icon:"mdi-alert", message:"Novo Erro"},
            // {type:"info", icon:"mdi-alert", message:"Nova informação"}
        ],
        
    },
    mutations:{
        inAlert(state, payload){
            state.alerts.push(payload);
        },
        outAlert(state){
            state.alerts.shift();
        }

    },
    actions:{
        addAlert({ commit }, payload){
            commit('inAlert', payload)
        },
        popAlert({ commit }){
            commit('outAlert')
        },
       
    },
    getters: {
        getAlerts(state){
            return state.alerts
        }
    }
}
