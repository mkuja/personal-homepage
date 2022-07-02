<template>
  <MyDesktop></MyDesktop>
  <MyMenuBar></MyMenuBar>
</template>

<script>
import MyDesktop from "@/components/MyDesktop";
import MyMenuBar from "@/components/MyMenuBar";

export default {
  name: 'App',
  components: {
    MyDesktop,
    MyMenuBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
