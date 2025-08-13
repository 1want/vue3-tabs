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
          @click.stop="close(index)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          class="close-icon"
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
import { ref } from 'vue'

interface TabItem {
  name: string
}
interface Props {
  list: TabItem[]
}
const current = ref(0)

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['handleClick', 'close'])

const handleClick = (item: TabItem, index: number) => {
  current.value = index
  emits('handleClick', item, index)
}

const close = (index: number) => {
  emits('close', index)
}
</script>

<style lang="scss">
.tabs-content {
  height: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 0;
  }
  .tabs {
    display: flex;
    align-items: center;
    height: 100%;
    white-space: nowrap;
  }
  .tab {
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
    &:hover {
      background-color: #409eff;
      color: #fff;
    }
    .close-icon {
      width: 13px;
      height: 13px;
      &:hover {
        border-radius: 2px;
        background: #0000001b;
      }
    }
  }
  .is-active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
