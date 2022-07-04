<template>
  <p v-html="converter.makeHtml(this.getContent($props.content))" class="contenz">
  </p>
</template>

<script>

import {Converter} from 'showdown';

export default {
  name: "FolderWindowContent",
  data() {
    return {
      converter: new Converter(),
      assetsRst: require("../../assets/source/assets.rst"),
      introductionRst: require("../../assets/source/introduction.rst"),
    }
  },
  props: {
    content: {
      type: String,
      required: true,
    }
  },
  methods: {
    getContent(content) {
      switch (content) {
        case 'assetsRst':
          return this.assetsRst;
        case 'introductionRst':
          return this.introductionRst;
        default:
          return false;
      }
    }
  }
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
