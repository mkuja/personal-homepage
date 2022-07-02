<template>
  <div class="container" v-bind:key="$props.id">
    <!--    Top scaling area.-->
    <div class="top-scale grid-item"
         draggable="true"
         v-on:dragstart="onDragStart"
         v-on:dragend="resizeNSEnd"
    ></div>
    <!--    Header-->
    <div class="header grid-item"
         draggable="true"
         v-bind:data-id="$props.id"
         v-on:dragstart="onDragStart"
         v-on:dragend="onDragEnd"
    >
      <h3>{{ $props.windowName }}</h3>
      <img v-bind:src="this.ccmButtons" usemap="#controls">
      <map name="controls" style="display: none">
        <area shape="circle" coords="8, 32, 13" v-on:click="closeWindow">
        <area shape="circle" coords="32, 32, 13" v-on:click="minimizeWindow">
        <area shape="circle" coords="56, 32, 13" v-on:click="maximizeWindow">
      </map>
    </div>
    <!--    Content area -->
    <div class="left-scale grid-item"
         draggable="true"
         v-on:dragstart="onDragStart"
         v-on:dragend="resizeWEEnd"
    ></div>
    <div class="content grid-item"></div>
    <div class="right-scale grid-item"
         draggable="true"
         v-on:dragstart="onDragStart"
         v-on:dragend="resizeEWEnd"
    ></div>
    <!--    Bottom resize area-->
    <div class="bottom-scale grid-item"
         draggable="true"
         v-on:dragstart="onDragStart"
         v-on:dragend="resizeSNEnd"
    ></div>

  </div>
</template>

<script>

export default {
  name: "FolderWindow",
  props: {
    windowName: String(),
    id: String,
    onCloseWindow: Function,
  },
  data() {
    return {
      clientX: -1,
      clientY: -1,
      ccmButtons: require("../assets/mmc-buttons.png"),
    }
  },
  methods: {
    onDragStart(event) {
      this.clientX = event.clientX;
      this.clientY = event.clientY;
    },
    onDragEnd(event) {
      let parentElement = event.target.parentElement;
      let offsetX = event.clientX - this.clientX;
      let offsetY = event.clientY - this.clientY;
      let left = parentElement.offsetLeft + offsetX;
      let top = parentElement.offsetTop + offsetY;
      parentElement.style.left = left + "px";
      parentElement.style.top = top + "px";
    },
    resizeNSEnd(event) {
      let offset = event.clientY - this.clientY;
      let inPx = event.target.parentElement.offsetTop + offset + "px";
      let parentEl = event.target.parentElement;
      parentEl.style.top = inPx;
      let brect = parentEl.getBoundingClientRect();
      parentEl.style.height = (brect.height - offset) + "px";
    },
    resizeSNEnd(event) {
      let offset = event.clientY - this.clientY;
      let parentEl = event.target.parentElement;
      let brect = parentEl.getBoundingClientRect();
      parentEl.style.height = (brect.height + offset) + "px";
    },
    resizeWEEnd(event) {
      let offset = event.clientX - this.clientX;
      let inPx = event.target.parentElement.offsetLeft + offset + "px";
      let parentEl = event.target.parentElement;
      parentEl.style.left = inPx;
      let brect = parentEl.getBoundingClientRect();
      parentEl.style.width = (brect.width - offset) + "px";
    },
    resizeEWEnd(event) {
      let offset = event.clientX - this.clientX;
      let parentEl = event.target.parentElement;
      let brect = parentEl.getBoundingClientRect();
      parentEl.style.width = (brect.width + offset) + "px";
    },
    closeWindow() {
      console.log(this.$props)
      this.$props.onCloseWindow(this.id)
    },
    minimizeWindow() {

    },
    maximizeWindow() {

    }
  }
}
</script>

<style scoped>
.container {
  display: grid;

}

.container {
  display: grid;
  grid-template-columns: 3px auto 3px;
  grid-template-rows: 3px 30px auto 3px;
  grid-template-areas:
      "top-scale top-scale top-scale"
      "left-scale header right-scale"
      "left-scale content right-scale"
      "left-scale bottom-scale right-scale";
  padding: 0px;
  background-color: #afb1b3;
  border: 1px solid black;
  box-shadow: black 5px 5px 5px;
  box-sizing: border-box;
  z-index: 2;
  width: 400px;
  height: 300px;
  position: fixed;
  top: 80px;
  left: 80px;
}

.header {
  display: flex;
  justify-content: space-between;
  height: 30px;
  background-color: aqua;
  margin: 0px;
  z-index: 2;
  grid-area: header;
  align-items: center;
}
.header img {
  position: relative;
  margin: 0px;
  top: 7px;
  left: -5px;
}
.header h3 {
  margin: 0px;
  margin-left: 10px;
}

.top-scale {
  width: 100%;
  cursor: ns-resize;
  grid-area: top-scale;
}

.bottom-scale {
  cursor: ns-resize;
  grid-area: bottom-scale;
}

.left-scale {
  cursor: ew-resize;
  grid-area: left-scale;
}

.right-scale {
  cursor: ew-resize;
  grid-area: right-scale;
}

.content {
  margin: 0px;
  width: 100%;
  height: auto;
  z-index: 2;
  grid-area: content;
}

</style>
