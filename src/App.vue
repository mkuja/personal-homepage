<template>
  <MqResponsive target="desktop">
    <MyDesktop></MyDesktop>
  </MqResponsive>
  <MqResponsive target="mobile">
    <MobileError></MobileError>
  </MqResponsive>
</template>

<script>
import MyDesktop from "@/components/MyDesktop";
import MobileError from "@/components/MobileError";
import {MqResponsive} from "vue3-mq";

export default {
  name: 'App',
  components: {
    MobileError,
    MyDesktop,
    MqResponsive
  },
  inject: ["mq"]
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
