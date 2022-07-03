<template>
  <div v-on:mouseover="activateMenu()" v-on:mouseout="deactivateMenu()" id="menu-button">
    <img v-if="!this.mouseOnMenuButton" src="../../assets/door-inactive.png">
    <img v-else src="../../assets/door-active.png">
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  data() {
    return {
      mouseOnMenuButton: false
    }
  },
  methods: {
    activateMenu() {
      this.mouseOnMenuButton = true;
    },
    deactivateMenu() {
      this.mouseOnMenuButton = false;
    }
  }
}


</script>

<style scoped>

#menu-button img{
  width: auto;
  height: 48px;
  margin-right: 15px;
}

</style>
