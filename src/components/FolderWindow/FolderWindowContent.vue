<template>
  <p v-if="typeof($props.content) === 'function'"
     v-html="converter.makeHtml($props.content())"
     class="contenz">
  </p>
  <FolderWindowIcons v-else
                     v-bind:icons-data="$props.content"
  ></FolderWindowIcons>


</template>

<script>

import {Converter} from 'showdown';
import FolderWindowIcons from "@/components/FolderWindow/FolderWindowIcons";

export default {
  name: "FolderWindowContent",
  components: {FolderWindowIcons},
  data() {
    return {
      converter: new Converter(),
    }
  },
  props: {
    content: {
      type: String,
      required: true,
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.contenz {
  text-align: left;
  margin-top: 0px;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
