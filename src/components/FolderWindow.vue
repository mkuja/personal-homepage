<template>
  <!-- use v-show because it only hides the elment but does not remove it from the DOM -->
  <!-- v-if will remove it from the DOM and so the position is no longer maintained -->
  <div class="container"
       v-show="!$props.minimized"
       ref="win"
       v-on:click="selectWindow($props.wId)"
  >
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
      <div class="control">
        <img v-bind:src="minimizeImage" v-on:click="this.minimizeWindow">
        <img v-bind:src="maximizeImage" v-on:click="this.maximizeWindow">
        <img v-bind:src="closeImage" v-on:click="deleteWindow(this.$props.wId)">
      </div>
    </div>
    <!--    Content area -->
    <div class="left-scale grid-item"
         draggable="true"
         v-on:dragstart="onDragStart"
         v-on:dragend="resizeWEEnd"
    ></div>
    <div class="content grid-item">
      <FolderWindowContent
          v-bind:content="$props.content"
      ></FolderWindowContent>
    </div>
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

import FolderWindowContent from "@/components/FolderWindow/FolderWindowContent";

export default {
  name: "FolderWindow",
  components: {FolderWindowContent},
  props: {
    windowName: String(),
    wId: String,
    onCloseWindow: Function,
    minimized: Boolean,
    content: String,
  },
  inject: ["makeWindow",
    "minimizeWindow",
    "deleteWindow",
    "getWindowLayer",
    "selectWindow",
    "windowLayers",
  ],
  data() {
    return {
      clientX: -1,
      clientY: -1,
      minWindowHeight: 180,
      minWindowWidth: 270,
      mmcButtons: require("../assets/mmc-buttons.png"),
      closeImage: require("../assets/close.png"),
      minimizeImage: require("../assets/minimize.png"),
      maximizeImage: require("../assets/maximise.png"),
    }
  },
  mounted() {
    console.log("Creating ", this.wId)
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
      let height = brect.height - offset;
      height = height < this.minWindowHeight ? this.minWindowHeight : height;
      parentEl.style.height = height + "px";
    },
    resizeSNEnd(event) {
      let offset = event.clientY - this.clientY;
      let parentEl = event.target.parentElement;
      let brect = parentEl.getBoundingClientRect();
      let height = brect.height + offset;
      height = height < this.minWindowHeight ? this.minWindowHeight : height;
      parentEl.style.height = height + "px";
    },
    resizeWEEnd(event) {
      let offset = event.clientX - this.clientX;
      let inPx = event.target.parentElement.offsetLeft + offset + "px";
      let parentEl = event.target.parentElement;
      parentEl.style.left = inPx;
      let brect = parentEl.getBoundingClientRect();
      let width = brect.width - offset;
      width = width < this.minWindowWidth ? this.minWindowWidth : width;
      parentEl.style.width = width + "px";
    },
    resizeEWEnd(event) {
      let offset = event.clientX - this.clientX;
      let parentEl = event.target.parentElement;
      let brect = parentEl.getBoundingClientRect();
      let width = brect.width + offset;
      width = width < this.minWindowWidth ? this.minWindowWidth : width;

      parentEl.style.width = width + "px";
    },
    closeWindow() {
      this.$props.onCloseWindow(this.$props.wId)
    },
    minimizeWindow(event) {
      const parentEl = event.target.parentElement.parentElement.parentElement;
      parentEl.style.display = parentEl.style.display === "none" ? "fixed" : "none";
    },
    maximizeWindow(event) {
      const parentEl = event.target.parentElement.parentElement.parentElement;
      if (!this.windowIsMaxized(parentEl)) {
        this.prevBoundingRect = parentEl.getBoundingClientRect();
        parentEl.style.left = "0px";
        parentEl.style.top = "0px";
        const width = parentEl.parentElement.getBoundingClientRect().width;
        const height = parentEl.parentElement.getBoundingClientRect().height;
        parentEl.style.height = `${height}px`;
        parentEl.style.width = `${width}px`;
      } else {
        parentEl.style.left = `${this.prevBoundingRect.left}px`;
        parentEl.style.top = `${this.prevBoundingRect.top}px`;
        parentEl.style.height = `${this.prevBoundingRect.height}px`;
        parentEl.style.width = `${this.prevBoundingRect.width}px`;
      }
    },
    windowIsMaxized(windowElement) {
      const brect = windowElement.getBoundingClientRect();
      const width = windowElement.parentElement.getBoundingClientRect().width;
      const height = windowElement.parentElement.getBoundingClientRect().height;
      const retval = width === brect.width && height === brect.height && windowElement.offsetTop === 0 && windowElement.offsetLeft === 0;
      return retval;
    }
  },
  watch: {
    minimized() {
      console.log("Minimized value changed")
    },
    windowLayers: {
      handler: function (newLayers) {
        console.log("Window layers changed. Setting z-index.");
        console.log(newLayers);
        const idx = newLayers.findIndex(x => x === this.wId);
        this.$refs.win.style["z-index"] = idx + 50;
      },
      deep: true
    }
  }
}
</script>

<style scoped>

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
  z-index: 150;
  width: 400px;
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
  grid-area: header;
  align-items: center;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
}

.header:active {
  cursor: grabbing;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px;
  width: 100%;
  height: auto;
  z-index: 2;
  grid-area: content;
  overflow: auto;
}

.control {
  margin: 0px;
  padding: 0px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.control img {
  position: static;
  width: 22px;
  height: 22px;
  margin: 0px;
  margin-left: 8px;
  padding: 0px;
}

</style>
