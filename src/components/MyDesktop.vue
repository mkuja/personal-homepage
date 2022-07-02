<template>
  <div id="my-desktop">
    <DesktopIcons v-bind:icons-data="icons"
    ></DesktopIcons>
    <FolderWindow v-for="window in this.windows"
                  v-bind:key="window.id"
                  v-bind:window-name="window.text"
                  v-bind:onCloseWindow="window.onCloseWindow"
    ></FolderWindow>
  </div>
</template>

<script>
import DesktopIcons from "@/components/MyDestop/DesktopIcons";
import FolderWindow from "@/components/FolderWindow";
import {ref} from "vue";
import {v4 as uuidv4} from "uuid";

export default {
  name: "MyDesktop",
  components: {DesktopIcons, FolderWindow},
  data() {
    return {
      icons: ref([
        {
          text: 'About me', icon: 'folder', id: uuidv4(),
          onDoubleClick: () => {
            //const wId = uuidv4();
            this.createWindow({
              text: "About me",
              id: this.id,
              onCloseWindow: () => {this.removeWindow(this.id)}
            })
          },
        },
        {
          text: 'Works', icon: 'folder', id: uuidv4(),
          onDoubleClick: () => {
            //const wId = uuidv4()
            this.createWindow({
              text: "Works",
              id: this.id,
              onCloseWindow: () => {this.removeWindow(this.id)}
            })
          },
        },
        {
          text: 'Assets used', icon: 'rst', id: uuidv4(),
          onDoubleClick: () => {
            //const wId = uuidv4()
            this.createWindow({
              text: "Assets used",
              id: this.id,
              onCloseWindow: () => {this.removeWindow(this.id)}
            })
          },
        },
      ]),
      windows: ref([]),
    }
  },
  methods: {
    createWindow(window) {
      this.windows.push(window)
    },
    removeWindow(windowId) {
      for (let i = 0; i < this.windows.length; i++) {
        if (this.windows[i].id === windowId) {
          this.windows.splice(i, 1);
          break;
        }
      }
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
