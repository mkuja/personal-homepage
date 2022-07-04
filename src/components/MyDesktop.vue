<template>
  <div id="my-desktop">
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
          text: 'About me', icon: 'folder', id: uuidv4(),
          onDoubleClick: () => {
            const wId = uuidv4();
            this.createWindow({
              icon: this.icon,
              text: "About me",
              minimized: false,
              wId: wId,
              content: "assetsRst",
              onCloseWindow: () => {
                this.removeWindow(wId)
              },
              onMinimizeWindow: (id) => {
                this.minimize(id)
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
              text: "Works",
              minimized: false,
              wId: wId,
              content: "assetsRst",
              onCloseWindow: () => {
                this.removeWindow(wId)
              },
              // The id is never stored on BarIcons.vue so the only time we can reference it is in the v-for loop
              // in the barIcons.vue. We are binding the value of wId on v-on:click="app.onMinimizeWindow(app.wId)
              // for later use. 
              onMinimizeWindow: (id) => {
                this.minimize(id)
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
              text: "Assets used",
              minimized: false,
              wId: wId,
              content: "assetsRst",
              onCloseWindow: () => {
                this.removeWindow(wId)
              },
              onMinimizeWindow: (id) => {
                this.minimize(id)
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
      window = reactive(window)
      this.windows.push(window)
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
