import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
       company:{
    balance:12000,
         }

    },
    mutations: { //sync
        // user(state,user){
        //     state.user=user;
        // },
        //store.commit('incrementScore',30)
        // incrementScore(state,pts){
        //     state.user.score+=pts;
        // },


    },
    actions: { //async

    },
    getters:{

    },
    modules: {
    }
})

