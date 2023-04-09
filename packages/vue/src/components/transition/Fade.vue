<script setup lang="ts">
import { Transition, computed } from 'vue'
import { EncCSSVariables } from '@cphayim-enc/style'

import { TimingFunction, useDuration, useTimingFunction } from './hooks'

defineOptions({ name: 'EncFadeTransition' })

type Props = {
  duration?: number | string
  timingFunction?: TimingFunction
  mode?: 'in-out' | 'out-in'
  appear?: boolean
}

const props = withDefaults(defineProps<Props>(), { mode: 'out-in', appear: true })
defineEmits<{
  beforeEnter: (el: HTMLElement) => void
  afterEnter: (el: HTMLElement) => void
  beforeLeave: (el: HTMLElement) => void
  afterLeave: (el: HTMLElement) => void
}>()

const duration = useDuration(props)
const timingFunction = useTimingFunction(props)

const cssVars = computed(() => ({
  [EncCSSVariables.TransitionDuration]: duration.value,
  [EncCSSVariables.AnimationDuration]: duration.value,
  [EncCSSVariables.TransitionTimingFunction]: timingFunction.value,
  [EncCSSVariables.AnimationTimingFunction]: timingFunction.value,
}))
</script>

<template>
  <Transition
    name="enc-fade"
    :mode="props.mode"
    :appear="props.appear"
    :style="cssVars"
    @beforeEnter="(e: unknown) => $emit('beforeEnter', e)"
    @afterEnter="(e: unknown) => $emit('afterEnter', e)"
    @beforeLeave="(e: unknown) => $emit('beforeLeave', e)"
    @afterLeave="(e: unknown) => $emit('afterLeave', e)"
  >
    <slot />
  </Transition>
</template>

<style>
.enc-fade-enter-active,
.enc-fade-leave-active {
  transition: all calc(var(--enc-transition-duration) * var(--enc-transition-rate));
  transition-timing-function: var(--enc-transition-timing-function);
}
.enc-fade-enter-from,
.enc-fade-leave-to {
  opacity: 0;
}

/* :slotted() {
  opacity: 0;
} */
</style>
