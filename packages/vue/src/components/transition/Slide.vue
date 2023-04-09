<script setup lang="ts">
import { computed } from 'vue'
import { EncCSSVariables } from '@cphayim-enc/style'

import { TimingFunction, useDuration, useTimingFunction } from './hooks'

defineOptions({ name: 'EncSlideTransition' })

type Props = {
  direction?: 'left-in' | 'right-in' | 'top-in' | 'bottom-in'
  fade?: boolean
  duration?: number | string
  timingFunction?: TimingFunction
  mode?: 'in-out' | 'out-in'
  appear?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'top-in',
  fade: true,
  mode: 'out-in',
  appear: true,
})
defineEmits<{
  beforeEnter: (el: HTMLElement) => void
  afterEnter: (el: HTMLElement) => void
  beforeLeave: (el: HTMLElement) => void
  afterLeave: (el: HTMLElement) => void
}>()

const duration = useDuration(props)
const timingFunction = useTimingFunction(props)
const transitionName = computed(() => `enc-slide-${props.direction}`)

const cssVars = computed(() => ({
  [EncCSSVariables.TransitionDuration]: duration.value,
  [EncCSSVariables.AnimationDuration]: duration.value,
  [EncCSSVariables.TransitionTimingFunction]: timingFunction.value,
  [EncCSSVariables.AnimationTimingFunction]: timingFunction.value,
}))
</script>

<template>
  <Transition
    :name="transitionName"
    :mode="props.mode"
    :appear="props.appear"
    :style="cssVars"
    :class="{ 'enc-fade': props.fade }"
    @beforeEnter="(e: unknown) => $emit('beforeEnter', e)"
    @afterEnter="(e: unknown) => $emit('afterEnter', e)"
    @beforeLeave="(e: unknown) => $emit('beforeLeave', e)"
    @afterLeave="(e: unknown) => $emit('afterLeave', e)"
  >
    <slot />
  </Transition>
</template>

<style>
.enc-slide-left-in-enter-active,
.enc-slide-left-in-leave-active,
.enc-slide-right-in-enter-active,
.enc-slide-right-in-leave-active,
.enc-slide-top-in-enter-active,
.enc-slide-top-in-leave-active,
.enc-slide-bottom-in-enter-active,
.enc-slide-bottom-in-leave-active {
  transition: all calc(var(--enc-transition-duration) * var(--enc-transition-rate));
  transition-timing-function: var(--enc-transition-timing-function);
}

.enc-slide-left-in-enter-from,
.enc-slide-left-in-leave-to {
  transform: translateX(-100%);
  &.enc-fade {
    opacity: 0;
  }
}

.enc-slide-right-in-enter-from,
.enc-slide-right-in-leave-to {
  transform: translateX(100%);
  &.enc-fade {
    opacity: 0;
  }
}

.enc-slide-top-in-enter-from,
.enc-slide-top-in-leave-to {
  transform: translateY(-100%);
  &.enc-fade {
    opacity: 0;
  }
}

.enc-slide-bottom-in-enter-from,
.enc-slide-bottom-in-leave-to {
  transform: translateY(100%);
  &.enc-fade {
    opacity: 0;
  }
}
</style>
