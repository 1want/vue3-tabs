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

const arr = [
  {
    name: 'a'
  },
  {
    name: 'b'
  },
  {
    name: 'c'
  }
]
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

| 参数   | 说明           | 类型     | 默认值                             |
| ------ | -------------- | -------- | ---------------------------------- |
| list   | 渲染的 tab     | object[] |                                    |
| active | 自定义高亮规则 | Function | (index) => current.value === index |

#### Events

| 参数        | 说明                 | 类型     | 默认值 |
| ----------- | -------------------- | -------- | ------ |
| handleClick | 点击 tab 事件回调    | function |        |
| close       | 点击关闭按钮事件回调 | function |        |

#### 预览视频

<video controls src="Jietu20250814-113130-HD.mp4" title="Title"></video>
