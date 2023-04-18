<script setup lang="ts">
import { computed } from 'vue'
import { EncCSSVariables } from '@cphayim-enc/style'

import { TimingFunction, useDuration, useTimingFunction } from './hooks'

defineOptions({ name: 'EncZoomTransition' })

type Props = {
  /**
   * 进入的方向
   * @default 'center-in'
   */
  direction?: 'center-in' | 'left-in' | 'right-in' | 'top-in' | 'bottom-in'
  /**
   * 是否同时使用 `fade` 效果
   * @default false
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
  direction: 'center-in',
  fade: false,
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
const transitionName = computed(() => `enc-zoom-${props.direction}`)

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
.enc-zoom-left-in-enter-active,
.enc-zoom-left-in-leave-active,
.enc-zoom-right-in-enter-active,
.enc-zoom-right-in-leave-active,
.enc-zoom-top-in-enter-active,
.enc-zoom-top-in-leave-active,
.enc-zoom-bottom-in-enter-active,
.enc-zoom-bottom-in-leave-active {
  transition: all calc(var(--enc-transition-duration) * var(--enc-transition-rate));
  transition-timing-function: var(--enc-transition-timing-function);
}

.enc-zoom-center-in-enter-active,
.enc-zoom-center-in-leave-active {
  transform-origin: center;
}
.enc-zoom-center-in-enter-from,
.enc-zoom-center-in-leave-to {
  transform: scale(0);
  &.enc-fade {
    opacity: 0;
  }
}

.enc-zoom-left-in-enter-active,
.enc-zoom-left-in-leave-active {
  transform-origin: left center;
}
.enc-zoom-right-in-enter-active,
.enc-zoom-right-in-leave-active {
  transform-origin: right center;
}
.enc-zoom-left-in-enter-from,
.enc-zoom-left-in-leave-to,
.enc-zoom-right-in-enter-from,
.enc-zoom-right-in-leave-to {
  transform: scaleX(0);
  &.enc-fade {
    opacity: 0;
  }
}

.enc-zoom-top-in-enter-active,
.enc-zoom-top-in-leave-active {
  transform-origin: center top;
}
.enc-zoom-bottom-in-enter-active,
.enc-zoom-bottom-in-leave-active {
  transform-origin: center bottom;
}
.enc-zoom-top-in-enter-from,
.enc-zoom-top-in-leave-to,
.enc-zoom-bottom-in-enter-from,
.enc-zoom-bottom-in-leave-to {
  transform: scaleY(0);
  &.enc-fade {
    opacity: 0;
  }
}
</style>
