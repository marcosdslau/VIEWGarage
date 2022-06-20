import header from '@/plugins/axios/header';
import axios from 'axios'
// import translateError from '@/erros';


export default {
    state: {
        rentsCars: {
            labels: [],
            datasets: []
        },
        nowRents: {
            labels: [],
            datasets: []
        }
        
    },
    mutations:{
        setRentsCars(state, payload){
            state.rentsCars = payload;
        },
        setNowRents(state, payload){
            state.nowRents = payload;
        },
    },
    actions:{
        async getAllRentCars({ commit }){
            try{
                let {data} = await axios.get('/rents?dashboard=true', header);
                // console.log(data.data);
                commit('setRentsCars', data.data)
            }catch(e){
                console.log(e)
            }
        },
        async getAllNowRents({ commit }){
            try{
                let {data} = await axios.get('/rents?nowRents=true', header);
                // console.log(data.data);
                commit('setNowRents', data.data)
            }catch(e){
                console.log(e)
            }
        },
        
    },
    getters: {
        getRentsCars(state){
            return state.rentsCars
        },
        getNowRents(state){
            return state.nowRents
        }
    }
}