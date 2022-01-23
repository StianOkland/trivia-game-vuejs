import { createStore } from "vuex";

export default createStore({
    state: {
        catecories: []
    },
    mutations: {
        setCatecories: (state, catecories) => {
            state.catecories = catecories
        }
    },
    actions: {
    },
})