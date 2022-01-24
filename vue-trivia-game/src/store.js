import { createStore } from "vuex";
import { apiFetchAllCategories } from "./api/categories";
import { apiFetchAllUsers } from "./api/users";

export default createStore({
    state: {
        categories: [],
        users: []
    },
    mutations: {
        setCategories: (state, categories) => {
            state.categories = categories
        },
        setUsers: (state, users) => {
            state.users = users
        }
    },
    actions: {
        async fetchCategories({ commit }) {
            const [ error, categories] = await apiFetchAllCategories()
            if(error !== null) {
                return error
            }
 
            commit("setCategories", categories)
            return null
        },
        async fetchUsers({ commit }) {
            const [ error, users] = await apiFetchAllUsers()
            if(error !== null) {
                return error
            }
            console.log(users[0].username)
            commit("setUsers", users)
            return null
        },
    },
})