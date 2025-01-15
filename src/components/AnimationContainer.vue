<template>
  <div class="animation-wrapper">
    <div ref="lottieContainer" class="lottie-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

// defineOptions({
//   inheritAttrs: false,
// })

const props = defineProps<{
  animationData: object
}>()

const emit = defineEmits(['animationComplete'])

const lottieContainer = ref<HTMLElement | null>(null)
let animationInstance: AnimationItem | null = null

function init({ container, animationData }: { container: HTMLElement; animationData: object }) {
  if (animationInstance) {
    animationInstance.destroy()
  }
  animationInstance = lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  })

  // Listen for the complete event
  animationInstance.addEventListener('complete', () => {
    emit('animationComplete') // Notify the parent component
  })
}

onMounted(() => {
  if (lottieContainer.value && props.animationData) {
    init({
      container: lottieContainer.value,
      animationData: props.animationData,
    })
  }
})

watch(
  () => props.animationData,
  (newVal, oldVal) => {
    if (newVal === oldVal) return
    if (lottieContainer.value && newVal) {
      init({
        container: lottieContainer.value,
        animationData: newVal,
      })
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => animationInstance && animationInstance.destroy())
</script>

<style scoped lang="scss">
.animation-wrapper {
  z-index: 1;
  position: absolute;
  pointer-events: none;
  top: 0;
}
.lottie-container {
  width: 5rem;
  height: 5rem;
  max-width: 5rem;
  max-height: 5rem;
  z-index: -1;
  background-size: cover;
  background-position: center;
  will-change: transform, opacity;
  transition: background-image 1s;
}
</style>
