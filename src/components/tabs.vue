<template>
  <div class="tabs-content">
    <div class="pre" @click="pre" :disabled="current >= index">
      <slot name="pre">
        <img src="../assets/images/arrow.png" alt="" />
      </slot>
    </div>
    <div class="tabs-box" ref="boxRef">
      <ul class="tabs" ref="tabsRef">
        <li class="tab" v-for="item of list" :key="item.name">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="next" @click="next" :disabled="current === 0">
      <slot name="next">
        <img src="../assets/images/arrow.png" alt="" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

interface Props {
  list: any[]
}

const props = defineProps<Props>()
const tabsRef = ref(null)
const boxRef = ref(null)
const boxWidth = ref(0)
const index = ref(0)
const current = ref(0)

onMounted(() => {
  boxWidth.value = boxRef.value.clientWidth
  index.value = Math.floor(tabsRef.value.scrollWidth / boxRef.value.clientWidth)
})

const pre = () => {
  current.value++
  tabsRef.value.style.transform = `translateX(-${
    current.value * boxWidth.value
  }px)`
}

const next = () => {
  current.value--
  tabsRef.value.style.transform = `translateX(-${
    current.value * boxWidth.value
  }px)`
}
</script>

<style scoped>
@import url('../assets/css/tabs.css');
</style>
