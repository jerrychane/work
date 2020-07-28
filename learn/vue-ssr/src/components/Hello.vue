<template>
  <div>hello world!</div>
</template>

<script>
export default {
  asyncData: ({ store }) => {
    return store.dispatch("getDataAction");
  },
  computed: {
    item() {
      return store.state.lists;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>