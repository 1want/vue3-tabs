<template>
  <div class="tabs-content">
    <div class="tabs">
      <div
        v-for="(item, index) in props.list"
        :key="index"
        :class="['tab', current === index && 'is-active']"
        @click="handleClick(item, index)"
      >
        {{ item.name }}
        <svg
          v-if="props.list.length > 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          class="icon"
          @click.stop="close(item, index)"
        >
          <path
            style="font-size: 12px"
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface TabItem {
  name: string
}
interface Props {
  list: TabItem[]
  jump?: boolean
  modelValue?: number
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['handleClick', 'close', 'update:list', 'update:modelValue'])

const current = ref<number>(Number.isFinite(props.modelValue) ? (props.modelValue as number) : 0)

function clamp<T extends number>(val: T, min: number, max: number): T {
  return Math.min(Math.max(val, min), max) as T
}

// 受控激活索引变化
watch(
  () => props.modelValue,
  val => {
    if (typeof val === 'number' && Number.isFinite(val)) {
      current.value = clamp(val, 0, Math.max(0, props.list.length - 1))
    }
  }
)

function handleClick(item: TabItem, index: number) {
  emits('handleClick', item, index)
  current.value = index
  emits('update:modelValue', index)
}

function close(item: TabItem, index: number) {
  const nextList = props.list.slice(0, index).concat(props.list.slice(index + 1))
  emits('close', item, index)
  emits('update:list', nextList)

  if (current.value > index) current.value -= 1
  current.value = clamp(current.value, 0, Math.max(0, nextList.length - 1))
}
</script>

<style>
.icon {
  width: 13px;
  height: 13px;
}
.tabs-content {
  height: 100%;
  background: red;
  overflow-x: scroll;
}
.tabs-content::-webkit-scrollbar {
  height: 0;
}

.tabs-content .tabs {
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
}
.tabs-content .tab {
  position: relative;
  cursor: pointer;
  border: 1px solid #d8dce5;
  color: #495060;
  height: 28px;
  line-height: 28px;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin-right: 10px;
}
.tabs-content .tab:hover {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.tabs-content .is-active {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}
</style>
