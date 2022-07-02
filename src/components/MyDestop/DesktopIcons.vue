<template>
  <div v-for="icon in $props.iconsData" v-bind:key="icon.text + icon.icon" class="icon"
       v-on:click="activateIcon(icon.text + icon.icon)"
       v-on:dblclick="icon.onDoubleClick()"
  >
    <img v-bind:src="getImage(icon.icon)">
    <div v-bind:class="{
        description: true,
        descriptionActive: isActiveIcon(icon.text + icon.icon)}"
    >
      {{ icon.text }}
    </div>
  </div>
</template>

<script>

export default {
  name: "DesktopIcons",
  data() {
    return {
      activeIcon: null,
    }
  },
  computed: {
  },
  methods: {
    getImage(iconName) {
      switch (iconName) {
        case "rst":
          return require("../../assets/rst-icon.png");
        default:
          return require("../../assets/folder-icon.png");
      }
    },
    isActiveIcon(icon) {
      return this.activeIcon === icon;
    },
    activateIcon(icon) {
      this.activeIcon = icon;
    },
  },
  props: {
    iconsData: Object,
    dblClickCb: Function
  }
}
</script>

<style scoped>
.icon {
  width: 64px;
  height: 80px;
  padding-bottom: 25px;
  padding-top: 10px;
  padding-left: 10px;
  z-index: 1;
}

.description {
  background-color: #afb1b3;
  width: 100%;
  margin: 4px;
}

.descriptionActive {
  background-color: aquamarine;
}
</style>
