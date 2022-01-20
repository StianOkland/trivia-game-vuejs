<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const startQuiz = () => {
    router.push({
        name: 'Questions',
    })
}

let username = ref('')

</script>

<template>
    <div>
        <h1>This is the Start Screen</h1>
        <input v-model="username" placeholder="Select a username">
        <p> Hello {{username}} </p>

        <button @click="startQuiz"> Start Quiz </button>
    </div>
    
</template>

<style scoped>
a {
    color: #42b983;
}
</style>