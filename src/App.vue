<template>
  <div class="content">
    <Tabs :list="arr" @handleClick="handleClick" @close="close" />
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
    name: 'li',
    url: 'c'
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
    name: 'walt',
    url: 'b'
  },
  {
    name: 'li',
    url: 'c'
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
  width: 680px;
  height: 100%;
}
.tab {
  width: 120px !important;
}
</style>
