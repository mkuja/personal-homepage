<template>
  <div v-on:mouseover="hilightMenu()"
       v-on:mouseout="dehilightMenu()"
       v-on:click="toggleMenu()"
       id="menu-button">
    <img v-if="!this.mouseOnMenuButton" src="../../assets/door-inactive.png">
    <img v-else src="../../assets/door-active.png">
    <div class="menu"
         ref="rollupMenu"
         v-show="displayMenu">
      <div>FUBAR</div>
      <div>BAFUR</div>
      <div>VOIVOI</div>
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
  methods: {
    toggleMenu() {
      this.displayMenu = !this.displayMenu;
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

.menu {
  position: relative;
  background-color: #afb1b3;
  margin: 0px;
  padding: 10px;
  bottom: calc(attr(height px) + 50px);
  display: flex;
  flex-direction: column;
  justify-content: end;
  box-sizing: border-box;
}

#menu-button img {
  width: auto;
  height: 48px;
  margin-right: 15px;
}

</style>
