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
    <div class="tabs-box">
      <ul
        class="tabs"
        ref="tabsRef"
        @click="adaptive($event)"
        :style="{ transform: `translateX(-${Number(transformX) + 'px'})` }"
      >
        <li
          :style="{ minWidth: props.width || 100 + 'px' }"
          class="tab"
          :class="current === index && 'is-active'"
          v-for="(item, index) of list"
          :key="index"
          @click="handleClick(item, index)"
        >
          {{ item.name }}
          <span
            @click.stop="close(item, index)"
            class="close-icon"
            v-if="showIcon"
          >
            <slot name="closeIcon">
              <svg
                t="1677743443079"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3618"
                width="18"
                height="18"
              >
                <path
                  d="M558.933333 529.066667l285.866667 285.866666-29.866667 29.866667-285.866666-285.866667-285.866667 285.866667-29.866667-29.866667 285.866667-285.866666L213.333333 243.2l29.866667-29.866667 285.866667 285.866667L814.933333 213.333333l29.866667 29.866667-285.866667 285.866667z"
                  fill="#ffffff"
                  p-id="3619"
                ></path>
              </svg>
            </slot>
          </span>
        </li>
      </ul>
    </div>
    <div
      class="next"
      @click="currentIndex !== 0 && next()"
      :class="currentIndex <= 0 && 'is-disabled'"
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
  ref,
  watch,
  watchEffect
} from 'vue'

interface Props {
  list: any[]
  jump?: boolean
  showIcon?: boolean
  width?: number
}
const props = defineProps<Props>()
const emits = defineEmits(['handleClick', 'close'])

const tabsRef = ref<HTMLElement>()
const pageSize = ref(0)
const currentIndex = ref(0)
const current = ref(0)
const transformX = ref(0)
let box = 0
let scrollWidth = 0
// const router = getCurrentInstance()!.appContext.config.globalProperties.$router

// console.log(getCurrentInstance)

onMounted(() => {
  box = tabsRef.value!.offsetWidth
  getBoxWidth()
})

const getBoxWidth = () => {
  scrollWidth = props.list.length * (props.width || 100)
  pageSize.value = Math.ceil(scrollWidth / box)
  currentIndex.value = pageSize.value - 1
  transform(currentIndex.value)
}

const pre = () => {
  if (!(pageSize.value > 1 && currentIndex.value < pageSize.value - 1)) return
  currentIndex.value++
  transform(currentIndex.value)
}

const next = () => {
  currentIndex.value--
  transform(currentIndex.value)
}

const transform = (index: number) => {
  transformX.value = index * tabsRef.value!.offsetWidth
}

const adaptive = (e: any) => {
  // console.log(e.target.offsetLeft)
  if (pageSize.value <= 1) return
  if (tabsRef.value!.offsetWidth - e.screenX + 40 < 100) {
    currentIndex.value++
    transformX.value = (currentIndex.value * tabsRef.value!.offsetWidth) / 2
  }
  if (e.screenX - 40 < 100 && currentIndex.value !== 0) {
    currentIndex.value--
    transformX.value =
      ((currentIndex.value || 1) * tabsRef.value!.offsetWidth) / 2
    return
  }
  if (e.screenX - 40 < 100 && currentIndex.value === 0) {
    transformX.value = 0
  }
}

const handleClick = (item: any, index: number) => {
  emits('handleClick', item, index)
  // props.jump && router.push(item?.url)
  current.value = index
}

const close = (item: any, index: number) => {
  props.list.splice(index, 1)
  if (current.value === 0 || current.value < index) return
  current.value--
  emits('close', item)
}

watch(props.list, getBoxWidth)
</script>

<style>
@import url('../assets/css/tabs.css');
</style>
