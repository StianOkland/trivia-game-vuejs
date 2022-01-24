import { createStore } from "vuex";
import { apiFetchAllCategories } from "./api/categories";
import { apiFetchAllUsers } from "./api/users";
import { apiFetchQuestions } from "./api/questions"

export default createStore({
    state: {
        categories: [],
        users: [],
        username: '',
        questionSpecs: {
            category: '',
            difficulty: '',
            numberOfQuestions: 0,
        },
        questions: {},
        currentQuestion: {
            question: '',
            index: 0,
            answers: []
        },
        userAnswers: []
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
        },
        setQuestions: (state, questions) => {
            state.questions = questions
        },
        setCurrentQuestion: (state, payload) => {
            state.currentQuestion.question = state.questions[payload[0]].question;
            state.currentQuestion.index = payload[0];

            // create an array with all answers. place correct answer at random position
            let answers = [];
            answers = answers.concat(state.questions[payload[0]].incorrect_answers)
            answers.splice(Math.floor(Math.random() * answers.length), -1, state.questions[payload[0]].correct_answer)

            state.currentQuestion.answers = answers
        },
        setUserAnswers: (state, payload) => {
            state.userAnswers = payload
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
        async fetchQuestions( {commit}, payload){
            // payload : [category, difficulty, questionsNum]
            const [error, questions] = await apiFetchQuestions(payload[0], payload[1], payload[2])
            if (error !== null){
                return error
            }
            commit("setQuestions", questions)
            commit("setCurrentQuestion", [0])
            return null
        }
    },
    getters: { 
        getCategory: state => {
            // use const x = store.getters.getCategory to get category.
            return state.questionSpecs.category
        },
        getDifficulty: state => {
            return state.questionSpecs.difficulty
        },
        getNumOfQuestions: state => {
            return state.questionSpecs.numberOfQuestions
        },
        getUsername: state => {
            return state.username
        },
        getQuestions: (state) => {
            return state.questions;
        },
        getCurrentQuestion: (state) => {
            return state.currentQuestion
        },
        getUserAnswers: (state) => {
            return state.userAnswers
        }
    }
})