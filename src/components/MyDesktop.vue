<template>
  <div id="my-desktop" v-bind:ondragover="onDragOver">
    <DesktopIcons v-bind:icons-data="icons"
    ></DesktopIcons>
    <FolderWindow v-for="window in this.windows"
                  v-bind:key="window.wId"
                  v-bind:w-id="window.wId"
                  v-bind:minimized="window.minimized"
                  v-bind:window-name="window.text"
                  v-bind:onCloseWindow="window.onCloseWindow"
                  v-bind:content="window.content"
    ></FolderWindow>
  </div>
  <MyMenuBar v-bind:apps="windows"
  ></MyMenuBar>
</template>

<script>
import DesktopIcons from "@/components/MyDestop/DesktopIcons";
import FolderWindow from "@/components/FolderWindow";
import {reactive, ref} from "vue";
import {v4 as uuidv4} from "uuid";
import MyMenuBar from "@/components/MyMenuBar";

export default {
  name: "MyDesktop",
  components: {MyMenuBar, DesktopIcons, FolderWindow},
  data() {
    return {
      icons: [
        {
          text: 'About me',
          icon: 'rst',
          id: uuidv4,
          createsWindow: {
            icon: this.icon,
            text: "About me",
            minimized: false,
            wId: uuidv4,
            content: this.introductionRst,
          }
        },
        {
          text: 'Works',
          icon: 'folder',
          id: uuidv4,
          createsWindow: {
            icon: this.icon,
            text: "Works",
            minimized: false,
            wId: uuidv4,
            content: [  // When typeof(content) === 'object', then it's more icons.
              {
                text: "Lights Out",
                icon: "rst",
                id: uuidv4,
                createsWindow: {
                  icon: "rst",
                  text: "Lights Out",
                  minimized: false,
                  wId: uuidv4,
                  content: this.lightsOut, // typeof() === 'string'
                },
              }]
          }
        },
        {
          text: 'Assets used',
          icon: 'rst',
          id: uuidv4,
          createsWindow: {
            icon: this.icon,
            text: "Assets used",
            minimized: false,
            wId: uuidv4,
            content: this.assetsUsed,
          }
        },
      ],
      windows: ref([]),
      activeIcon: ref(String),
    }
  },
  methods: {
    introductionRst() {
      return require("../assets/source/introduction.rst");
    },
    assetsUsed() {
      return require("../assets/source/assets.rst");
    },
    lightsOut() {
      return require("../assets/source/lights_out.rst");
    },
    onDragOver(event) {
      event.preventDefault();
      console.log(event);
    },
    createWindow(win) {
      console.log(win)
      let windo = reactive({...win, wId: win.wId()})
      this.windows.push(windo)
    },
    minimize(id) {
      console.log("Searching", id)
      for (let i = 0; i < this.windows.length; i++) {
        console.log(this.windows[i].wId)
        if (this.windows[i].wId === id) {
          console.log("Found")
          this.windows[i].minimized = !this.windows[i].minimized
          break;
        }
      }
    },
    removeWindow(windowId) {
      for (let i = 0; i < this.windows.length; i++) {
        if (this.windows[i].wId === windowId) {
          this.windows.splice(i, 1);
          break;
        }
      }
    },
    makeActiveIcon(uuid) {
      this.activeIcon = uuid;
    },
    isActiveIcon(uuid) {
      return this.activeIcon === uuid;
    }
  },
  provide() {
    return {
      makeWindow: this.createWindow,
      minimizeWindow: this.minimize,
      deleteWindow: this.removeWindow,
      makeActiveIcon: this.makeActiveIcon,
      isActiveIcon: this.isActiveIcon,
      onMinimizeWindow: this.minimize
    }
  }
}
</script>

<style scoped>

#my-desktop {
  background: url("~../assets/background.jpeg");
  background-size: contain;
  height: 90vh;
  width: 100%;
}
</style>
