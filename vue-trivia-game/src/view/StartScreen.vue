<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


const apiURL = 'so-noroff-api.herokuapp.com'
const categoryArray = ref([])
const username = ref('')
const router = useRouter()
const selectedCategory = ref('')
const numOfQuestions = ref(0)
const difficulty = ref('')


const store = useStore();

onMounted(async () => {
    await store.dispatch('fetchCategories')
    await store.dispatch('fetchUsers')

})

const categories = computed(() => store.state.categories)



const startQuiz = () => {
    router.push({
        name: 'Questions',
    })
}
</script>

<template>
    <main>
        <h1> Hello </h1>
        <form>
            <fieldset>
                <label for="username" aria-label="Username">Username</label>
                <input type="text" id="username" v-model.lazy="username"/>
            </fieldset>
        </form>

        <h2>Choose categories to get questions from:  </h2>
        <div v-for="category in categories.trivia_categories" :key="category.id">
            <input type="radio" v-model="selectedCategory" :value="category.name">
            <label> {{category.name}} </label>
        </div>

        <div>
            <h2>Choose difficulty:  </h2>

            <select v-model="difficulty">
                <option disabled value=""> Choose difficulty </option>
                <option> Any difficulty </option>
                <option> Easy </option>
                <option> Medium </option>
                <option> Hard </option>
                
            </select>
        </div>


        <div> 
            <h2>Choose number of questions:  </h2>
            <input v-model.number="numOfQuestions" type="number">
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
a {
    color: #42b983;
}
</style>



