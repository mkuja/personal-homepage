<template>

  <div class="container">
    <div v-on:mouseover="hilightMenu()"
         v-on:mouseout="dehilightMenu()"
         v-on:click="toggleMenu()"
         id="menu-button">
      <img v-if="!this.mouseOnMenuButton" src="../../assets/door-inactive.png">
      <img v-else src="../../assets/door-active.png">
    </div>
  </div>

</template>

<script>
export default {
  name: "MyMenu",
  data() {
    return {
      mouseOnMenuButton: false,
      displayMenu: false,
    }
  },
  inject: ["changeMenuStatus"],
  methods: {
    toggleMenu() {
      this.displayMenu = !this.displayMenu;
      this.changeMenuStatus(this.displayMenu);
    },
    hilightMenu() {
      this.mouseOnMenuButton = true;
    },
    dehilightMenu() {
      this.mouseOnMenuButton = false;
    }
  }
}


</script>

<style scoped>



#menu-button img {
  width: auto;
  height: 48px;
  margin: 0px;
  margin-right: 100%;
}

.container {
}

</style>
