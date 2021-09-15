<template>
  <div>
    Hello Word! Vue = {{ vueVersion }}
  </div>
</template>

<script>
import * as Vue from 'vue';

export default {
  name: 'App',
  data: () => ({
    vueVersion: null,
  }),
  mounted() {
    const obj = {...Vue};
    if (obj.default) {
      this.vueVersion = obj.default.version;
    } else {
      this.vueVersion = obj.version;
    }
  }
};
</script>
