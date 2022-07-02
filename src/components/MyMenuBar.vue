<template>
<div class="my-menu-bar">
  <MyMenu></MyMenu>
</div>
</template>

<script>
import MyMenu from "@/components/MyMenuBar/MyMenu";

export default {
  name: "MyMenuBar",
  components: {MyMenu},
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

</style>
