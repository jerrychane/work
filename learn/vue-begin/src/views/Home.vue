<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    {{msg1}}
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data () {
    return {
      msg1: 'hello imooc'
    }
  },
  components: {
    HelloWorld
  }
}
</script>
