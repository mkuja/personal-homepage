<template>
  <template v-for="app in $props.apps" v-bind:key="app.wId">
    <div class="menu-item-container" v-on:click="app.onMinimizeWindow(app.wId)">
      <div class="menu-item-icon">
        <img v-bind:src="getIcon(app.icon)">
      </div>
      <div class="menu-item-text">
        {{ app.text }}
      </div>
    </div>
  </template>
</template>

<script>

export default {
  name: "BarIcons",
  methods: {
    getIcon(icon) {
      switch (icon) {
        case 'rst':
          return this.rstIcon;
        default:
          return this.folderIcon;
      }
    }
  },
  props: {
    apps: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      folderIcon: require("../../assets/folder-icon.png"),
      rstIcon: require("../../assets/rst-icon.png"),
    }
  }
}
</script>

<style scoped>
.menu-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
  padding-left: 3px;
  padding-right: 3px;
}
.menu-item-container:hover {
  background-color: #dddfe1;
}
.menu-item-icon img {
  height: 35px;
}
.menu-item-text {
  margin-left: 5px;
  font-weight: bold;
  font-size: large;
}
</style>
