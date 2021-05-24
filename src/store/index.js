import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
       company:{
           id:'27',
           balance:12000,
         },
        manager:{

        }

    },
    mutations: { //sync
        me(state,manager){
            state.manager=manager;
        },
       // store.commit('mycompany',30)
        mycompany(state,company){
            state.company=company;
        },


    },
    actions: { //async

    },
    getters:{

    },
    modules: {
    }
})

