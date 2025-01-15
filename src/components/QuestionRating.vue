<template>
  <div class="rating-selector">
    <div
      class="form-wrapper-ratings"
      :style="{
        '--selected-rating': modelValue || 0,
      }"
    >
      <div
        v-for="(n, i) in 5"
        :key="n"
        class="rating-item"
        :class="{ selected: modelValue === n }"
        @click="selectRating(n)"
        :style="getRatingItemStyle(n)"
      >
        <div class="circle" :style="getCircleStyle(n)"></div>
        <div v-if="i !== 4" class="lines" :key="'line-' + n" :style="getLineStyle(n)" />
      </div>
      <AnimationContainer
        v-if="showAnimation && animationData"
        :animationData="animationData"
        :class="[`rating-${modelValue}`, 'animation']"
        @animationComplete="handleAnimationComplete"
      />
    </div>

    <div class="rating-labels">
      <span class="font-weight-black color-blue-light label label-low">{{ labels.low }}</span>
      <span class="font-weight-black label label-high">{{ labels.high }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

import one from '@/assets/animations/1check.json'
import two from '@/assets/animations/2like.json'
import three from '@/assets/animations/3like.json'
import four from '@/assets/animations/4love.json'
import AnimationContainer from '@/components/AnimationContainer.vue'

const props = defineProps<{
  modelValue: number | null
  labels: {
    low: string
    high: string
  }
}>()
const emit = defineEmits(['update:modelValue'])

const animationData = ref(null)
const showAnimation = ref(false)
function handleAnimationComplete() {
  showAnimation.value = false
}

const selectRating = (rating: number) => {
  if (rating === 5) animationData.value = four
  if (rating === 4) animationData.value = three
  if (rating === 3) animationData.value = two
  if (rating === 2) animationData.value = one
  showAnimation.value = true
  emit('update:modelValue', rating)
}

const getGradientColor = (startColor: string, endColor: string, fraction: number): string => {
  const parseColor = (hex: string) => hex.match(/.{1,2}/g)!.map((x) => parseInt(x, 16))

  const [r1, g1, b1] = parseColor(startColor.slice(1))
  const [r2, g2, b2] = parseColor(endColor.slice(1))

  const r = Math.round(r1 + fraction * (r2 - r1))
  const g = Math.round(g1 + fraction * (g2 - g1))
  const b = Math.round(b1 + fraction * (b2 - b1))

  return `rgb(${r}, ${g}, ${b})`
}

const getRatingItemStyle = (n: number) => {
  const startColor = '#4F7EAF'
  const endColor = '#64D8BF'
  const fraction = (n - 1) / 4
  const borderColor = getGradientColor(startColor, endColor, fraction)

  return {
    borderColor,
  }
}

const getCircleStyle = (n: number) => {
  const startColor = '#4F7EAF'
  const endColor = '#64D8BF'
  const fraction = (n - 1) / 4
  const backgroundColor = getGradientColor(startColor, endColor, fraction)

  return props.modelValue === n ? { backgroundColor } : {}
}

const getLineStyle = (n: number) => {
  const startColor = '#4F7EAF'
  const endColor = '#64D8BF'
  const fraction = n / 4
  const backgroundColor = getGradientColor(startColor, endColor, fraction)

  return {
    backgroundColor,
    height: '4px',
    width: '8rem',
    position: 'absolute',
    top: '50%',
    left: '3rem',
    borderRadius: '20px',
  }
}
</script>

<style scoped lang="scss">
.rating-selector {
  width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.form-wrapper-ratings {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 1.6rem 3.4rem;
  border-radius: 26rem;
}

.rating-item {
  z-index: 1;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 50%;
  border: 4px solid;
  cursor: pointer;
}

.rating-2 {
  left: 14rem;
  top: 0.4rem;
}
.rating-3 {
  left: 26rem;
  top: 0.4rem;
}
.rating-4 {
  left: 38rem;
  top: 0.4rem;
}
.rating-5 {
  left: 50rem;
  top: 0.4rem;
}

.circle {
  border-radius: 50%;
  width: 50%;
  height: 50%;
  opacity: 1;
  transition: all 0.3s;
}

.rating-labels {
  display: flex;
  justify-content: space-between;
  width: 110%;
  position: absolute;
  top: 6rem;
  font-size: 1.5rem;

  .label {
    width: 8rem;
    &-low {
      text-align: start;
    }
    &-high {
      text-align: end;
    }
  }
}
</style>
