<template>
<div>
  <div>用户信息</div>
  <ul>
    <li v-for="(item,index) in userList" :key="index">{{item.name}}</li>
  </ul>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userList: []
    }
  },
  // created () {
  //   axios.get('http://jsonplaceholder.typicode.com/users').then(res => {
  //     console.log(res)
  //     this.userList = res.data
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
  async created () {
    const res = await axios.get('http://jsonplaceholder.typicode.com/users')
    console.log(res)
    const { data } = res
    this.userList = data
  }
}
</script>

<style>
li {
  list-style: none;
  line-height: 26px;
}
</style>
