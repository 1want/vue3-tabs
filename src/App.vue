<template>
  <div class="content">
    <Tabs :list="arr"></Tabs>
  </div>

  <!-- <tabs>
      <tab-item>1</tab-item>
      <tab-item>2</tab-item>
      <tab-item>3</tab-item>
    </tabs> -->

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
</script>

<style scoped>
button {
  margin-top: 50px;
}
.content {
  width: 700px;
  height: 100%;
}
</style>
