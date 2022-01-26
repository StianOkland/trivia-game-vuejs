<script setup>
import { computed, onMounted} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

onMounted(async () => {
    await store.dispatch('fetchUsers')
})

const store = useStore();
const router = useRouter();

const userAnswers = computed(() => store.getters.getUserAnswers) 
const users = computed(() => store.state.users)
const questions = computed(() => store.getters.getQuestions)
let score = 0;

// Function to check if score is new highscore. If so, add new score to API.
const updateHighScore = async () => {
    await store.dispatch('updateHighScore', score)
}


// Function to calculate score based on correct answers
const getScore = () => {
    for(let i = 0; i < questions.value.length; i++) {
        if(userAnswers.value[i] === questions.value[i].correct_answer) {
           score += 10;
        }
    }
    updateHighScore();
}


// Function for button that returns user to homescreen
const restart = () => {
    router.push({
        name: 'HomeScreen',
    });
};

getScore();
</script>

<template>
    <h1> Quiz result </h1>
    <h2> Score: {{ score }} </h2> <!-- Append score -->

    <div class="centered">
        <h2> Questions </h2>
        <ol>
            <span v-for="question in questions" :key="question.question"> <!-- Looping through given questions -->
                <li v-html="question.question"></li>
            </span>
        </ol>
        <h2> Your answers </h2>

        <ol>
            <span v-for="userAnswer in userAnswers" :key="userAnswer.value"> <!-- Looping through users answers -->
                <li v-html="userAnswer"></li>
            </span>
        </ol>
        <h2> Correct answers </h2>
        <ol>
            <span v-for="question in questions" :key="question.correct_answer"> <!-- Looping through correct answers -->
                <li v-html="question.correct_answer"> </li>
            </span>
        </ol>
    </div>

    <button @click="restart"> Restart Quiz </button> <!-- Button to return to home screen -->

</template>

<style scoped>
.centered{
    list-style-position: inside;
}
</style>