import { createStore } from "vuex";
import { apiFetchAllCategories } from "./api/categories";
import { apiFetchAllUsers } from "./api/users";

export default createStore({
    state: {
        categories: [],
        users: [],
        username: '',
        questionSpecs: {
            category: '',
            difficulty: '',
            numberOfQuestions: 0,
        }
    },
    mutations: {
        setCategories: (state, categories) => {
            state.categories = categories
        },
        setUsers: (state, users) => {
            state.users = users
        },
        setUsername: (state, username) => {
            state.username = username
        },
        setQuestionSpecs: (state, specs) => {
            state.questionSpecs = specs
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

            commit("setUsers", users)
            return null
        },
    },
})