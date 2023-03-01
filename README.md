### Vue3 Tabs

### Installation

`npm install v3-tabs`

or pnpm

`pnpm add v3-tabs`

### Usage

```vue
<template>
  <div class="content">
    <Tabs :list="arr" />
  </div>
</template>

<script setup>
import Tabs from 'v3-tabs'
import { ref } from 'vue'

const arr = ref([
  {
    name: 'a'
  },
  {
    name: 'b'
  },
  {
    name: 'c'
  }
])
</script>

<style>
.content {
  width: 680px;
  height: 100%;
}
</style>
```

### API

#### Props

| 参数     | 说明                 | 类型     | 默认值 |
| -------- | -------------------- | -------- | ------ |
| list     | 渲染的 tab           | object[] |        |
| showIcon | 是否显示关闭按钮     | boolean  | false  |
| jump     | 在点击时自动路由跳转 | boolean  | false  |

#### Events

| 参数        | 说明                 | 类型     | 默认值 |
| ----------- | -------------------- | -------- | ------ |
| handleClick | 点击 tab 事件回调    | function |        |
| close       | 点击关闭按钮事件回调 | function |        |
