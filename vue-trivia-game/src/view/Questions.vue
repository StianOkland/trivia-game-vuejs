<script setup>
import { ref } from 'vue'

//test variables
const category = '9';
const difficulty = 'medium';
const questionsNum = '3';
let userAnswers = [];
//test variables end

const apiURL = `https://opentdb.com/api.php?amount=${questionsNum}&category=${category}&difficulty=${difficulty}`;
let questions;
let currentQuestion = ref({
    question: '',
    incorrect_answers: [''],
    correct_answer: '',
    type: ''
    });

let index = 0; // index used to iterate through questions
let currentAnswers = ref([]);
let selectedAnswer = ref('');

function getQuestions(){
    return fetch(apiURL)
    .then(response => response.json())
}

function updateCurrentQuestion(){
    // updates variables with the current question and its answers
    currentQuestion.value = questions[index];
    currentAnswers.value = currentAnswers.value.concat(currentQuestion.value.incorrect_answers)
    currentAnswers.value.splice(Math.floor(Math.random() * currentAnswers.value.length), -1, currentQuestion.value.correct_answer)
}

getQuestions()
.then(function(data) {
    questions = data.results;
    updateCurrentQuestion();
})


const handleAnswer = () => {
    if (selectedAnswer.value == ''){
        alert("Please select an answer")
    }
    else {
        userAnswers.push(selectedAnswer.value)
        currentAnswers.value = []
        selectedAnswer.value = ''

        if (index < questions.length - 1){
            index++;
            updateCurrentQuestion();
        }
        else {
            // TO DO: save answers to state and push /results view

            console.log("User answers: " + userAnswers)
        }
    }
} 

</script>

<template>
    <h1 v-html="currentQuestion.question"> </h1>
    <div v-for="(a, index) in currentAnswers" :key="index">
        <input type="radio" :value="a" v-model="selectedAnswer" :checked="selectedAnswer == a">
        <label v-html="a"></label>
    </div>
    <button @click="handleAnswer">Submit answer</button>
</template>

<style scoped>

</style>