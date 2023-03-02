<template>
  <div class="tabs-content">
    <div
      class="pre"
      @click="pre"
      :class="(pageSize <= 1 || currentIndex >= pageSize - 1) && 'is-disabled'"
    >
      <slot name="pre">
        <ArrowIcon />
      </slot>
    </div>
    <div class="tabs-box" ref="boxRef">
      <ul class="tabs" ref="tabsRef">
        <li
          class="tab"
          v-for="(item, index) of list"
          :key="item.name"
          @click="handleClick(item, index)"
          :class="current === index && 'is-active'"
        >
          {{ item.name }}
          <span
            @click.stop="close(item, index)"
            class="close-icon"
            v-if="showIcon"
          >
            x
          </span>
        </li>
      </ul>
    </div>
    <div
      class="next"
      @click="currentIndex !== 0 && next()"
      :class="currentIndex === 0 && 'is-disabled'"
    >
      <slot name="next">
        <ArrowIcon />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from './arrow-icon.vue'
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  ref,
  watch,
  watchEffect
} from 'vue'

interface Props {
  list: any[]
  jump?: boolean
  showIcon?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['handleClick', 'close'])

const tabRef = ref<HTMLElement>()
const tabsRef = ref<HTMLElement>()
const boxRef = ref<HTMLElement>()
const boxWidth = ref<number>()
const pageSize = ref(0)
const currentIndex = ref(0)
const current = ref(0)
// const router = getCurrentInstance()!.appContext.config.globalProperties.$router

// console.log(getCurrentInstance()!)

onMounted(() => {
  boxWidth.value = boxRef.value!.offsetWidth
  getBoxWidth()
})

const getBoxWidth = () => {
  let cWidth = 0
  for (let i of tabsRef.value.children) {
    cWidth += i.offsetWidth
  }
  pageSize.value = Math.ceil(cWidth / boxWidth.value!)
}

const pre = () => {
  if (!(pageSize.value > 1 && currentIndex.value < pageSize.value)) return
  currentIndex.value++
  tabsRef.value!.style.transform = `translateX(-${
    currentIndex.value * boxWidth.value!
  }px)`
}

const next = () => {
  currentIndex.value--
  tabsRef.value!.style.transform = `translateX(-${
    currentIndex.value * boxWidth.value!
  }px)`
}

const handleClick = (item: any, index: number) => {
  emits('handleClick', item)
  // props.jump && router.push(item?.url)
  current.value = index
}

const close = (item: any, index: number) => {
  emits('close', item)
  props.list.splice(index, 1)
}

watch(
  props.list,
  (newV, oldV) => {
    getBoxWidth()
    if (pageSize.value > 1 && pageSize.value > currentIndex.value) {
      pre()
    }
  },
  {
    flush: 'post'
  }
)
</script>

<style>
@import url('../assets/css/tabs.css');
</style>
