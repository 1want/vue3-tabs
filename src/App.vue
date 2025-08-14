<template>
  <div class="content">
    <Tabs
      v-model:list="historyMenu"
      :active="item => item.url === windowUrl"
      @handleClick="handleClick"
      @close="close"
    />
  </div>
  <div
    class="menu"
    v-for="item of arr"
    :key="item.name"
    @click="jump(item)"
    :class="item.url === windowUrl && 'is-active'"
  >
    {{ item.name }}
  </div>
</template>

<script setup lang="ts">
import Tabs from './components/tabs.vue'
import { ref } from 'vue'
const windowUrl = ref('/a')
const historyMenu = ref([
  {
    name: '系统设置',
    url: '/a'
  }
])

const arr = [
  {
    name: '系统设置',
    url: '/a'
  },
  {
    name: '用户管理',
    url: '/b'
  },
  {
    name: '调整设置',
    url: '/c'
  },
  {
    name: '系统设置1',
    url: '/a1'
  },
  {
    name: '用户管理1',
    url: '/b1'
  },
  {
    name: '调整设置1',
    url: '/c1'
  },
  {
    name: '系统设置2',
    url: '/a2'
  },
  {
    name: '用户管理2',
    url: '/b2'
  },
  {
    name: '调整设置2',
    url: '/c2'
  }
]

const handleClick = item => {
  windowUrl.value = item.url
}

const close = index => {
  console.log(index)
}

const jump = item => {
  if (!historyMenu.value.some(menu => menu.name === item.name)) {
    historyMenu.value.push(item)
  }
  windowUrl.value = item.url
}
</script>

<style scoped>
.menu {
  cursor: pointer;
  margin: 10px 0;
}
.is-active {
  color: #409eff;
}
.content {
  width: 400px;
  height: 36px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  /* overflow: hidden; */
}
</style>
