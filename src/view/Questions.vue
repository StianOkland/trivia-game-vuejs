<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const store = useStore();
const category = computed (() => store.getters.getCategory)
const difficulty = computed (() => store.getters.getDifficulty)
const questionsNum = computed (() => store.getters.getNumOfQuestions)
const currentQuestion = computed (() => store.getters.getCurrentQuestion)
const index = computed (() => currentQuestion.value.index)
const questionSpecs = computed (() => store.getters.getQuestionSpecs)
const questions = computed (() => store.getters.getQuestions)

const router = useRouter()

onMounted(async () => {
    await store.dispatch('fetchQuestions', [category.value, difficulty.value, questionsNum.value])

    if (JSON.stringify(questions.value) == '[]'){
        alert('Not enough questions for your settings.');
        router.push({
            name: 'HomeScreen'
        })
    }
})

let userAnswers = [];

let selectedAnswer = ref('');

const handleAnswer = () => {
    if (selectedAnswer.value == ''){
        alert("Please select an answer")
    }
    else {
        userAnswers.push(selectedAnswer.value)
        selectedAnswer.value = ''

        if (index.value < questionsNum.value - 1){
            store.commit('setCurrentQuestion', [index.value + 1])
        }
        else {
            // store.commit('setCurrentQuestion', [0])
            store.commit('setUserAnswers', userAnswers)
            router.push({
                name: 'Result',
            })
        }
    }
} 

</script>

<template>
    <h1 v-html="currentQuestion.question"> </h1>
    <div v-for="(a, index) in currentQuestion.answers" :key="index">
        <input type="radio" :value="a" v-model="selectedAnswer" :checked="selectedAnswer == a">
        <label v-html="a"></label>
    </div>
    <button @click="handleAnswer">Submit answer</button>
</template>

<style scoped>
</style>