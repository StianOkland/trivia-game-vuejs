<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const userAnswers = computed(() => store.getters.getUserAnswers) 

const newQuiz = () => {
    router.push({
        name: 'HomeScreen',
    });
};

// TODO: function to check if score is new highscore
</script>

<template>
    <h1>Quiz result</h1>
    <h2>Highscore: 500</h2> <!-- TODO: get users highscore -->

    <table>
        <thead>
            <tr>
                <th>Question</th>
                <th>Your answer</th>
                <th>Correct answer</th>
            </tr>
        </thead>
        <tbody> <!-- TODO: loop through both userAnswers and questions -->
            <tr v-for="answer in userAnswers">
                <td></td>
            </tr>
        </tbody>
    </table>

    <button @click="restart"> Restart Quiz </button>

</template>

<style scoped>
</style>