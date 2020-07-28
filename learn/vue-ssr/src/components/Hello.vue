<template>
  <div>hello world!</div>
</template>

<script>
export default {
  asyncData: ({ store }) => {
    store.dispatch("getDataAction");
  }
};
</script>

<style lang="scss" scoped>
</style>