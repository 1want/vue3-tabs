<template>
  <div class="v3-tabs" ref="tabsContentRef">
    <div class="tabs">
      <div
        v-for="(item, index) in props.list"
        :key="item.name"
        :class="['tab', isActive(item, index) && 'is-active']"
        @click="handleClick(item, index)"
      >
        <span class="tab-name">{{ item.name }}</span>
        <svg
          v-if="props.list.length > 1"
          @click.stop="close(index)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          class="close-icon"
        >
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUpdated } from 'vue'
import type { TabItem, Props } from '../types'

const current = ref(0)

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['handleClick', 'close'])
const tabsContentRef = ref<HTMLDivElement | null>(null)

const isActive = (item: TabItem, index: number) => {
  if (props.active) {
    return props.active(item)
  } else {
    return current.value === index
  }
}

// 将高亮 tab 滚动到容器中间（仅在溢出时，左右两方向都支持）
const centerActiveTab = (preferIndex?: number) => {
  const content = tabsContentRef.value
  if (!content) return

  let target: HTMLElement | null = null
  if (typeof preferIndex === 'number') {
    const tabs = content.querySelectorAll('.tabs .tab') as NodeListOf<HTMLElement>
    target = tabs[preferIndex]
  } else {
    target = content.querySelector('.tabs .tab.is-active') as HTMLElement | null
  }

  if (!target) return

  target.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  })
}

const handleClick = (item: TabItem, index: number) => {
  current.value = index
  emits('handleClick', item, index)
}

const close = (index: number) => {
  emits('close', index)
}

// 列表变化后（新增/删除），尝试把高亮项居中
watch(
  () => props.list.length,
  async () => {
    await nextTick()
    centerActiveTab()
  }
)

// 初次挂载/刷新后，居中当前高亮
onMounted(() => {
  nextTick(() => centerActiveTab())
})

// 父级导致的高亮变化（如切换菜单/路由）后也居中
onUpdated(() => {
  centerActiveTab()
})
</script>

<style lang="scss">
.v3-tabs {
  height: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
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
    color: #495060;
    height: 28px;
    line-height: 28px;
    border: 1px solid #d8dce5;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-right: 10px;
    box-sizing: content-box;
    &:hover {
      background-color: #409eff;
      border-color: #409eff;
      color: #fff;
    }
    .tab-name {
      margin-right: 4px;
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
    border-color: #409eff;
    color: #fff;
  }
}
</style>
