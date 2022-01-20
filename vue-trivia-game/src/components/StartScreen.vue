<script setup>
import { ref } from 'vue'

let username = ref('')

</script>

<template>
    <h1>This is the Start Screen</h1>
    <input v-model="username" placeholder="Select a username">
    <p> Hello {{username}} </p>
    <router-link :to="{ name: 'Questions' }" tag="button"> Start </router-link>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>