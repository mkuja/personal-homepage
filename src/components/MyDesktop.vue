<template>
  <div id="my-desktop">
    <DesktopIcons v-bind:icons-data="icons"
    ></DesktopIcons>
    <FolderWindow v-for="window in this.windows"
                  v-bind:key="window.wId"
                  v-bind:w-id="window.wId"
                  v-bind:window-name="window.text"
                  v-bind:onCloseWindow="window.onCloseWindow"
    ></FolderWindow>
  </div>
  <MyMenuBar v-bind:apps="windows"
  ></MyMenuBar>
</template>

<script>
import DesktopIcons from "@/components/MyDestop/DesktopIcons";
import FolderWindow from "@/components/FolderWindow";
import {ref} from "vue";
import {v4 as uuidv4} from "uuid";
import MyMenuBar from "@/components/MyMenuBar";

export default {
  name: "MyDesktop",
  components: {MyMenuBar, DesktopIcons, FolderWindow},
  data() {
    return {
      icons: [
        {
          text: 'About me', icon: 'folder', id: uuidv4(),
          onDoubleClick: () => {
            const wId = uuidv4();
            this.createWindow({
              icon: this.icon,
              mbId: uuidv4(),
              text: "About me",
              wId: wId,
              onCloseWindow: () => {
                this.removeWindow(wId)
              }
            })
          },
        },
        {
          text: 'Works', icon: 'folder', id: uuidv4(),
          onDoubleClick: () => {
            const wId = uuidv4()
            this.createWindow({
              icon: this.icon,
              mbId: uuidv4(),
              text: "Works",
              wId: wId,
              onCloseWindow: () => {
                this.removeWindow(wId)
              }
            })
          },
        },
        {
          text: 'Assets used', icon: 'rst', id: uuidv4(),
          onDoubleClick: () => {
            const wId = uuidv4()
            this.createWindow({
              icon: this.icon,
              mbId: uuidv4(),
              text: "Assets used",
              wId: wId,
              onCloseWindow: () => {
                this.removeWindow(wId)
              }
            })
          },
        },
      ],
      windows: ref([]),
    }
  },
  methods: {
    createWindow(window) {
      this.windows.push(window)
    },
    removeWindow(windowId) {
      for (let i = 0; i < this.windows.length; i++) {
        if (this.windows[i].wId === windowId) {
          this.windows.splice(i, 1);
          break;
        }
      }
    }
  },
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
