<template>
<div class="my-menu-bar">
  <MyMenu class="my-menu"></MyMenu>
  <BarIcons v-bind:apps="$props.apps"></BarIcons>
</div>
</template>

<script>
import MyMenu from "@/components/MyMenuBar/MyMenu";
import BarIcons from "@/components/MyMenuBar/BarIcons";

export default {
  name: "MyMenuBar",
  components: {BarIcons, MyMenu},
  props: {
    apps: {
      required: true,
      type: Object
    }
  },
  data() {

  },
  computed: {

  },
  methods: {

  }

}
</script>

<style scoped>

.my-menu-bar {
  height: 50px;
  width: 100%;
  margin-top: 0px;
  padding: 0px;
  display: flex;
  background-color: #afb1b3;
}

.my-menu-bar {
}

</style>
