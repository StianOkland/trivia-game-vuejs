<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


// const apiURL = 'https://so-noroff-api.herokuapp.com/trivia'
const username = ref('')
const router = useRouter()
const selectedCategory = ref('')
const numOfQuestions = ref(1)
const difficulty = ref('')

const store = useStore();

onMounted(async () => {
    await store.dispatch('fetchCategories')
    await store.dispatch('fetchUsers')

})

const categories = computed(() => store.state.categories)
const users = computed(() => store.state.users)
const usernameStore = computed(() => store.state.username)
const specs = computed(() => store.state.questionSpecs)
store.commit('setUsername', username)
store.commit('setQuestionSpecs', {'category': selectedCategory,'difficulty': difficulty, 'numberOfQuestions': numOfQuestions})


const isValidNum = () => {
    console.log('aggaga')
    console.log(numOfQuestions.value)
    if(numOfQuestions.value < 1) {
        numOfQuestions.value = 1
        alert('Must be between 1 and 50')
    }
    else if(numOfQuestions.value > 50) {
        numOfQuestions.value = 50
        alert('Must be between 1 and 50')
    }
}

const startQuiz = () => {
    router.push({
        name: 'Questions',
    })
}
</script>

<template>
    <main>
        <h2> Choose a username </h2>
        <form>
            <!-- <label for="username" aria-label="Username">Username</label> -->
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
            {{specs}}
        </div>
 
        <button type="submit" @click="startQuiz"> Start Quiz </button>

    </main>
</template>

<style scoped>
</style>



