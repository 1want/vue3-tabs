<template>
  <div class="content">
    <Tabs :list="arr" showIcon />
  </div>

  <button @click="add">add</button>
</template>

<script setup lang="ts">
import Tabs from './components/tabs.vue'
import { ref } from 'vue'

const arr = ref([
  {
    name: 'jack',
    url: 'a'
  },
  {
    name: 'walt',
    url: 'b'
  },
  {
    name: 'li',
    url: 'c'
  },
  {
    name: 'jack',
    url: 'a'
  },
  {
    name: 'walt',
    url: 'b'
  },
  {
    name: 'jack',
    url: 'a'
  },
  {
    name: 'walt',
    url: 'b'
  }
])
let num = 0
const add = () => {
  arr.value.push({
    name: num,
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

<style>
button {
  margin-top: 50px;
}
.content {
  width: 682px;
  height: 100%;
}
</style>
