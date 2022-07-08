<template>
  <div class="menu" ref="menu">
    <div class="menu-item"
         v-for="menuItem in $props.menuItems"
         v-on:click="makeWindow(menuItem.createsWindow)"
         v-bind:key="menuItem.wId">{{ menuItem.text }}</div>
  </div>
</template>

<script>
export default {
  name: "MyMenuRollUp",
  data() {
    return {
      menuBotPos: 0,
    }
  },
  inject: ["makeWindow"],
  props: ["menuItems"],
  mounted() {
    const yPosOffset = this.$refs.menu.getBoundingClientRect().height + 50;
    this.$refs.menu.style.bottom = `${yPosOffset}px`;
  }
}
</script>

<style scoped>
.menu {
  position: relative;
  background: linear-gradient(90deg, rgba(175,177,179,1) 0%, rgba(175,177,179,1) 97%, rgba(255,0,0,0) 100%);
  margin: 0px;
  padding: 0px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-sizing: border-box;
    width: fit-content;
}

.menu-item {
  font-size: x-large;
  padding: 8px 10px 3px 20px;
  text-align: right;
  cursor: pointer;
}

.menu-item:hover {

  background-color: aquamarine;
}


</style>
