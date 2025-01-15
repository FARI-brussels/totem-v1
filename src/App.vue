<template>
  <header class="app-bar">
    <FButtonIcon
      v-if="currentRoute.name !== 'home'"
      name="chevron-left"
      small
      @click="router.push('/')"
    />
    <LanguageSelector :locale="locale" @update:locale="setLocale" />
  </header>
  <main class="content">
    <RouterView :locale="locale" @start="router.push('/select')" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import LanguageSelector from '@/components/LanguageSelector.vue'
import { FButtonIcon } from 'fari-component-library'
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { currentRoute } = useRouter()

const { locale } = storeToRefs(useLocaleStore())
const { setLocale } = useLocaleStore()
</script>

<style scoped lang="scss">
.app-bar {
  height: 23rem;
  // height: 20%;
  width: 100%;
  // background-color: green;
  top: 0;
  display: flex;
  align-items: end;
  margin-bottom: 6rem;
}

.content {
  width: 100%;
  height: 94rem;
  min-height: 94rem;
  // height: 80%;
}

.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
