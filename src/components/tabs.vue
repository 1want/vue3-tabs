<template>
  <div class="tabs-content">
    <div
      class="pre"
      @click="currentIndex < index && pre()"
      :class="currentIndex >= index && 'is-disabled'"
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

const tabsRef = ref<HTMLElement>()
const boxRef = ref<HTMLElement>()
const boxWidth = ref<number>()
const index = ref(0)
const currentIndex = ref(0)
const current = ref(0)
const router = getCurrentInstance()!.appContext.config.globalProperties.$router

onMounted(() => {
  boxWidth.value = boxRef.value!.clientWidth
  getBoxWidth()
})

const getBoxWidth = () => {
  index.value = Math.floor(tabsRef.value!.scrollWidth / boxWidth.value!)
}

const pre = () => {
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
  props.jump && router.push(item?.url)
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
    if (index.value > currentIndex.value) {
      pre()
    }
    // if (index.value < currentIndex.value) {
    //   next()
    // }
  },
  {
    flush: 'post'
  }
)
</script>

<style>
@import url('../assets/css/tabs.css');
</style>
