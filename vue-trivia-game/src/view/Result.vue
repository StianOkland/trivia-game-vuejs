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

const updateHighScore = async () => {
    await store.dispatch('updateHighScore', score)
}

const getScore = () => {
    for(let i = 0; i < questions.value.length; i++) {
        if(userAnswers.value[i] === questions.value[i].correct_answer) {
           score += 10;
        }
    }
    updateHighScore();
}

const restart = () => {
    router.push({
        name: 'HomeScreen',
    });
};


getScore();
</script>

<template>
    <h1> Quiz result </h1>
    <h2> Highscore: {{ score }} </h2>

    <!-- <table>
        <thead>
            <tr>
                <th> Question </th>
                <th> Your answer </th>
                <th> Correct answer </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <div v-for="question in questions" :key="question.question">
                    <td>{{ question.question }}</td>
                </div>
                <div v-for="userAnswer in userAnswers" :key="userAnswer.value">
                    <td>{{ userAnswer }}</td>
                </div>
                <div v-for="question in questions" :key="question.correct_answer">
                    <td>{{ question.correct_answer }}</td>
                </div>
            </tr>
        </tbody>
    </table> -->

    <div>
        <h2> Questions </h2>
        <div v-for="question in questions" :key="question.question">
            <label>{{ question.question }}</label>
        </div>
        <h2> Your answers </h2>
        <div v-for="userAnswer in userAnswers" :key="userAnswer.value">
            <label>{{ userAnswer }}</label>
        </div>
        <h2> Correct answers </h2>
        <div v-for="question in questions" :key="question.correct_answer">
            <label>{{ question.correct_answer }}</label>
        </div>
    </div>

    <button @click="restart"> Restart Quiz </button>

</template>

<style scoped>
</style>