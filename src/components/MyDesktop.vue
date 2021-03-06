<template>
  <div>
    <div id="my-desktop" v-bind:ondragover="onDragOver">
      <DesktopIcons v-bind:icons-data="icons"
      ></DesktopIcons>
      <FolderWindow v-for="(window, index) in this.windows"
                    v-bind:key="window.wId"
                    v-bind:w-id="window.wId"
                    v-bind:minimized="window.minimized"
                    v-bind:window-name="window.text"
                    v-bind:onCloseWindow="window.onCloseWindow"
                    v-bind:content="window.content"
                    v-bind:layer="50 + index"
      ></FolderWindow>
    </div>
    <MyMenuBar v-bind:apps="windows"
    ></MyMenuBar>
    <MyMenuRollUp v-on:menuStatus="changeMenuStatus"
                  v-if="menuStatus"
                  v-bind:menuItems="icons"
                  class="relative"></MyMenuRollUp>
  </div>
</template>

<script>
import DesktopIcons from "@/components/MyDestop/DesktopIcons";
import FolderWindow from "@/components/FolderWindow";
import {reactive, ref} from "vue";
import {v4 as uuidv4} from "uuid";
import MyMenuBar from "@/components/MyMenuBar";
import MyMenuRollUp from "@/components/MyMenuBar/MyMenuRollUp";

export default {
  name: "MyDesktop",
  components: {MyMenuRollUp, MyMenuBar, DesktopIcons, FolderWindow},

  data() {
    return {
      menuStatus: false,
      icons: [
        {
          text: 'About me',
          icon: 'rst',
          id: uuidv4(),
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
          id: uuidv4(),
          createsWindow: {
            icon: this.icon,
            text: "Works",
            minimized: false,
            wId: uuidv4,
            content: [  // When typeof(content) === 'object', then it's more icons.
              {
                text: "Lights Out",
                icon: "rst",
                id: uuidv4(),
                createsWindow: {
                  text: "Lights Out",
                  minimized: false,
                  wId: uuidv4,
                  content: this.lightsOut, // typeof() === 'string'
                },
              },
              {
                text: "Video Convertor",
                icon: "rst",
                id: uuidv4(),
                createsWindow: {
                  text: "Video Convertor",
                  minimized: false,
                  wId: uuidv4,
                  content: this.videoConvertor,
                }
              },
            ]
          }
        },
        {
          text: 'Assets used',
          icon: 'rst',
          id: uuidv4(),
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
      windowLayers: ref([]),
      activeIcon: ref(String),
    }
  },
  watch: {
    windows() {
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
    videoConvertor() {
      return require("../assets/source/video_convertor.rst");
    },
    onDragOver(event) {
      event.preventDefault();
      console.log(event);
    },
    createWindow(win) {
      console.log(win);
      let windo = reactive({...win, wId: win.wId()});
      this.windows.push(windo);
      this.windowLayers.push(windo.wId);
    },
    selectWindow(id) {
      console.log("Selecting window...")
      console.log(this.windowLayers)
      const idx = this.windowLayers.findIndex((elem) => elem === id);
      this.windowLayers.push(this.windowLayers[idx]);
      this.windowLayers.splice(idx, 1);
    },
    getWindowLayer(id) {
      return 50 + this.windowLayers.findIndex((elem) => id === elem);
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
      this.windowLayers.splice(
          this.windowLayers.findIndex((elem) => elem === windowId)
      );
    },
    makeActiveIcon(uuid) {
      console.log(`Making icon ${uuid} active..`);
      this.activeIcon = uuid;
    },
    isActiveIcon(uuid) {
      console.log(`Checking if icon ${uuid} is active..`)
      return this.activeIcon === uuid;
    },
    changeMenuStatus(status) {
      console.log(`Menu status changed: ${status}`);
      this.menuStatus = status;
    }
  },
  provide() {
    return {
      makeWindow: this.createWindow,
      minimizeWindow: this.minimize,
      deleteWindow: this.removeWindow,
      makeActiveIcon: this.makeActiveIcon,
      isActiveIcon: this.isActiveIcon,
      onMinimizeWindow: this.minimize,
      getWindowLayer: this.getWindowLayer,
      selectWindow: this.selectWindow,
      windowLayers: this.windowLayers,
      menuStatus: this.menuStatus,
      changeMenuStatus: this.changeMenuStatus
    }
  }
}
</script>

<style scoped>

#my-desktop {
  background: url("~../assets/background_small.jpeg");
  background-size: contain;
  height: calc(100vh - 70px);
  width: 100%;
}

.relative {
  position: relative;
}
</style>
