<template>
  <div class="content">
    <Tabs v-model:list="arr" showIcon />
  </div>

  <button @click="add">add</button>
</template>

<script setup lang="ts">
import Tabs from './components/tabs.vue'
import { ref } from 'vue'

const arr = ref([
  {
    name: '系统设置',
    url: 'a'
  },
  {
    name: '用户管理',
    url: 'b'
  },
  {
    name: '调整设置',
    url: 'c'
  }
])
let num = 0
const add = () => {
  arr.value.push({
    name: num + '',
    url: 'a'
  })
  num++
}

const handleClick = item => {
  console.log(item)
}

const close = () => {
  console.log('c')
}
</script>

<style scoped>
button {
  margin-top: 50px;
}
.content {
  width: 682px;
  height: 36px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  /* overflow: hidden; */
}
</style>
