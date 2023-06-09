<script setup lang="ts">
import { computed, type TransitionProps } from 'vue'
import { EncCSSVariables } from '@cphayim-enc/style'

import { type TimingFunction, useDuration, useTimingFunction } from './hooks'

defineOptions({ name: 'EncFadeTransition' })

type Props = {
  /**
   * 动画时长
   * @default EncCSSVariables.TransitionDuration
   */
  duration?: number | string
  /**
   * 动画曲线
   * @default EncCSSVariables.TransitionTimingFunction
   */
  timingFunction?: TimingFunction
  /**
   * 过渡模式
   * @default 'out-in'
   */
  mode?: 'in-out' | 'out-in'
  /**
   * 是否在首次渲染时触发动画
   * @default true
   */
  appear?: boolean
}

const props = withDefaults(defineProps<Props>(), { mode: 'out-in', appear: true })
const emit = defineEmits<{
  (e: 'beforeEnter', el: Element): void
  (e: 'afterEnter', el: Element): void
  (e: 'beforeLeave', el: Element): void
  (e: 'afterLeave', el: Element): void
}>()

const duration = useDuration(props)
const timingFunction = useTimingFunction(props)

const cssVars = computed(() => ({
  [EncCSSVariables.TransitionDuration]: duration.value,
  [EncCSSVariables.AnimationDuration]: duration.value,
  [EncCSSVariables.TransitionTimingFunction]: timingFunction.value,
  [EncCSSVariables.AnimationTimingFunction]: timingFunction.value,
}))

const transitionProps = computed<TransitionProps>(() => ({
  name: 'enc-fade',
  css: true,
  mode: props.mode,
  appear: props.appear,
  style: cssVars.value,
  onBeforeEnter: (el) => emit('beforeEnter', el),
  onAfterEnter: (el) => emit('afterEnter', el),
  onBeforeLeave: (el) => emit('beforeLeave', el),
  onAfterLeave: (el) => emit('afterLeave', el),
}))
</script>

<template>
  <transition v-bind="transitionProps">
    <slot />
  </transition>
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
</style>
