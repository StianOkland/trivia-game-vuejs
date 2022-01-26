<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// Variables to holde userinput
const username = ref('')
const selectedCategory = ref('')
const numOfQuestions = ref(1)
const difficulty = ref('')

// Router and Store
const router = useRouter()
const store = useStore();

// Fetch categories and users
onMounted(async () => {
    await store.dispatch('fetchCategories')
    await store.dispatch('fetchUsers')
})

// Variables to hold and update data from store
const categories = computed(() => store.state.categories)
const users = computed(() => store.state.users)
const usernameStore = computed(() => store.state.username)
const specs = computed(() => store.state.questionSpecs)
store.commit('setUsername', username)
store.commit('setQuestionSpecs', {'category': selectedCategory,'difficulty': difficulty, 'numberOfQuestions': numOfQuestions})


// Check if selected number is between 1 and 50. If number is less than 1, set number to 1, if number is more than 50 set number to 50
const isValidNum = () => {
    if(numOfQuestions.value < 1) {
        numOfQuestions.value = 1
        alert('Must be between 1 and 50')
    }
    else if(numOfQuestions.value > 50) {
        numOfQuestions.value = 50
        alert('Must be between 1 and 50')
    }
}

// Register a new user
const registUser = async () => {
    await store.dispatch('registerUser', username.value)
}


// When staring the game, if username is not used before register a new user.
// Direct to questions-screen
const startQuiz = () => {
    let isUser = 0

    // Check if the username is already in use
    for(let i = 0; i < users.value.length; i++) {

        if(users.value[i].username == username.value) {
            isUser = 1
            store.commit('setCurrentUser', users.value[i])
        }
    }

    // If not in use, register new user
    if(isUser === 0) {
        registUser()
    }

    router.push({
        name: 'Questions',
    })
}
</script>

<template>
    <main>
        <h2> Choose a username </h2>
        <form>
            <input type="text" id="username" v-model.lazy="username" placeholder="Insert username"/>
        </form>

        <h2>Choose categories to get questions from:  </h2>
        <div v-for="category in categories.trivia_categories" :key="category.id">
            <input type="radio" v-model="selectedCategory" :value="category.id">
            <label> {{category.name}} </label>
        </div>

        <div>
            <h2>Choose difficulty:  </h2>
            <select v-model="difficulty">
                <option disabled value=""> Choose difficulty </option>
                <option> Any difficulty </option>
                <option value="easy"> Easy </option>
                <option value="medium"> Medium </option>
                <option value="hard"> Hard </option>
                
            </select>
        </div>

        <div> 
            <h2>Choose number of questions:  </h2>
            <input v-model.number.lazy="numOfQuestions" type="number" max=50 min=1  @change="isValidNum" >
        </div>
        
        <div> 
            <h2>You have chosen:  </h2>
            <h4>Username {{username}} </h4>
            <h4>Category: {{selectedCategory}}</h4>
            <h4>Difficulty: {{difficulty}}</h4>
            <h4>Number of Questions: {{numOfQuestions}}</h4>
        </div>
 
        <button type="submit" @click="startQuiz"> Start Quiz </button>

    </main>
</template>

<style scoped>
</style>



