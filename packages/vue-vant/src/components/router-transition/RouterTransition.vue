<!--
 * 添加路由过渡动画
 * 注意你需要在路由配置添加 meta.depth
 * 当从较小的 depth 前往较大的 depth 时（进入子页面），将使用进入动画
 * 当从较大的 depth 前往较小的 depth 时（返回父页面），将使用退出动画
 * 同级 depth 或一方未定义 depth 不使用动画
 -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouteLocationNormalized, useRouter } from 'vue-router'

defineOptions({ name: 'EncRouterTransition' })

enum Direction {
  Left = 'left',
  Right = 'right',
  None = 'none',
}

const direction = ref(Direction.None)
const transitionName = computed(() => `slide-${direction.value}`)

function setDirection(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  const toDepth = to.meta?.depth as number | undefined
  const fromDepth = from.meta?.depth as number | undefined
  if (toDepth === fromDepth || toDepth === void 0 || fromDepth === void 0) {
    direction.value = Direction.None
  } else if (toDepth > fromDepth) {
    direction.value = Direction.Left
  } else {
    direction.value = Direction.Right
  }
}

const router = useRouter()
router.beforeEach((to, from, next) => {
  setDirection(to, from)
  next()
})
</script>

<template>
  <transition :name="transitionName">
    <slot />
  </transition>
</template>

<style>
:root {
  --enc-router-transition-duration: 0.33s;
  --enc-router-transition-exit-distance: -60%;
  --enc-router-transition-entry-distance: 100%;
  --enc-router-transition-mask-brightness: 0.4;
}
</style>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: all;
  transition: all calc(var(--enc-transition-rate) * var(--enc-router-transition-duration))
    ease-in-out;
  box-shadow: 0 0 4px #aaa;
}

.slide-right-enter-from {
  filter: brightness(var(--enc-router-transition-mask-brightness));
  transform: translate3d(var(--enc-router-transition-exit-distance), 0, 0);
}

.slide-right-leave-active {
  z-index: 1;
  transform: translate3d(var(--enc-router-transition-entry-distance), 0, 0);
  transition: all calc(var(--enc-transition-rate) * var(--enc-router-transition-duration) * 1.2)
    ease-in-out;
}

.slide-left-enter-from {
  transform: translate3d(var(--enc-router-transition-entry-distance), 0, 0);
}

.slide-left-leave-active {
  z-index: -1;
  filter: brightness(var(--enc-router-transition-mask-brightness));
  transform: translate3d(var(--enc-router-transition-exit-distance), 0, 0);
  transition: all calc(var(--enc-transition-rate) * var(--enc-router-transition-duration) * 1.2)
    ease-in-out;
}
</style>
