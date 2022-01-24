<script setup>
  import Header from './components/Header.vue'
</script>

<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2E4057;
}
</style>
