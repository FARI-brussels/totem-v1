<template>
  <div class="form-wrapper-rating" @click="toggleSelection">
    <div class="rating-item" :class="{ isChecked }">
      <div class="circle"></div>
    </div>
    <div class="rating-labels">
      <span class="font-weight-bold label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string
  modelValue: string[]
}>()

const emit = defineEmits(['update:modelValue'])

const isChecked = computed(() => props.modelValue && props.modelValue.includes(props.value))

const toggleSelection = () => {
  const newValue = isChecked.value
    ? props.modelValue.filter((v) => v !== props.value)
    : [...props.modelValue, props.value]

  emit('update:modelValue', newValue)
}
</script>

<style scoped lang="scss">
.form-wrapper-rating {
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
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
  border: 4px solid #4393de;
}

.rating-item.isChecked {
  background-color: #204899;

  .circle {
    opacity: 1;
  }
}

.circle {
  width: 50%;
  height: 50%;
  opacity: 0;
  transition: all 0.3s;
  background-color: #4393de;
}

.label {
  font-size: 1.75rem;
  opacity: 0.75;
}
</style>
