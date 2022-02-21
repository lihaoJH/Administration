import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import getter from "./getter";
import action from "./action";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    getter,
    action,
    plugins:[createPersistedState({
        key:"token",
    })]
})