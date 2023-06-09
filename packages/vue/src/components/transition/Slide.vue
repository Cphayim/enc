<script setup lang="ts">
import { computed, type TransitionProps } from 'vue'
import { EncCSSVariables } from '@cphayim-enc/style'

import { type TimingFunction, useDuration, useTimingFunction } from './hooks'

defineOptions({ name: 'EncSlideTransition' })

type Props = {
  /**
   * 进入的方向
   * @default 'top-in'
   */
  direction?: 'left-in' | 'right-in' | 'top-in' | 'bottom-in'
  /**
   * 是否同时使用 `fade` 效果
   * @default true
   */
  fade?: boolean
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

const props = withDefaults(defineProps<Props>(), {
  direction: 'top-in',
  fade: true,
  mode: 'out-in',
  appear: true,
})
const emit = defineEmits<{
  (e: 'beforeEnter', el: Element): void
  (e: 'afterEnter', el: Element): void
  (e: 'beforeLeave', el: Element): void
  (e: 'afterLeave', el: Element): void
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

const transitionProps = computed<TransitionProps>(() => ({
  name: transitionName.value,
  css: true,
  mode: props.mode,
  appear: props.appear,
  style: cssVars.value,
  class: { 'enc-fade': props.fade },
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
