<template>
  <MyDesktop></MyDesktop>
</template>

<script>
import MyDesktop from "@/components/MyDesktop";

export default {
  name: 'App',
  components: {
    MyDesktop
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box;
  color: #2c3e50;
}
</style>
