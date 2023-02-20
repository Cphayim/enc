<script setup lang="ts">
import { computed, onActivated, ref, useSlots } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

import {
  NavBar as VanNavBar,
  Icon as VanIcon,
  Tabbar as VanTabbar,
  TabbarItem as VanTabbarItem,
} from 'vant'
import 'vant/es/nav-bar/style/index'
import 'vant/es/icon/style/index'
import 'vant/es/tabbar/style/index'
import 'vant/es/tabbar-item/style/index'

import type { TabBarOption } from '.'

defineOptions({ name: 'EncLayout' })

type LayoutProps = {
  title?: string // 头部标题
  backArrow?: boolean // 头部显示返回箭头
  onBack?: () => any // 当点击头部返回箭头时触发，覆盖默认行为
  hideHeaderBorder?: boolean // 隐藏头部底边
  hideHeader?: boolean // 隐藏头部
  showTabBar?: boolean // 显示 tabBar
  disableScroll?: boolean // 禁止主体滚动
  disableSwipeBack?: boolean // 禁止主体左侧滑动返回
  platform?: 'auto' | 'ios' | 'android' // 平台
  tabBarOptions?: TabBarOption[] // 底部 tabBar 选项
}
const props = withDefaults(defineProps<LayoutProps>(), {
  showTabBar: false,
  disableScroll: false,
  disableSwipeBack: false,
  platform: 'auto',
})

const slots = useSlots()
const hasHeader = computed(() => !props.hideHeader)
const hasFooter = computed(() => !!slots.footer)

const router = useRouter()
const handleBack = () => {
  if (props.onBack) props.onBack()
  else router.back()
}

const main = ref<Element>()
const scrollTop = ref(0)
// store scrollTop
const handleScroll = useDebounceFn((e) => {
  scrollTop.value = e.target.scrollTop
}, 100)
// restore scrollTop
onActivated(() => {
  if (!main.value) return
  main.value.scrollTop = scrollTop.value
})

let touchOriginX = Infinity
const handleTouchStart = (e: TouchEvent) => {
  const { clientX } = e.touches[0]
  touchOriginX = clientX
}
const handleTouchEnd = (e: TouchEvent) => {
  const { clientX } = e.changedTouches[0]
  if (props.disableSwipeBack || touchOriginX >= 40) return
  if (props.backArrow && clientX - touchOriginX >= 160) {
    router.back()
  }
  touchOriginX = Infinity
}
const handleTouchCancel = () => {
  touchOriginX = Infinity
}

const ua = navigator.userAgent
const platform = {
  iPhone: !!ua.match(/(iPhone\sOS)\s([\d_]+)/),
  iPad: !!ua.match(/(iPad).*OS\s([\d_]+)/),
  Android: !!ua.match(/(Android);?[\s/]+([\d.]+)?/) || !!ua.match(/(HarmonyOS);/), // 安卓和鸿蒙都归为安卓
}

const isAndroid = ref(props.platform === 'auto' ? platform.Android : props.platform === 'android')
</script>

<template>
  <div class="enc-layout-[vant]" :class="{ 'android-p2v-ignore': isAndroid }">
    <!-- header -->
    <div v-if="hasHeader" class="enc-layout-[vant]__header">
      <slot name="header">
        <van-nav-bar
          :title="title"
          fixed
          placeholder
          safe-area-inset-top
          :border="!hideHeaderBorder"
        >
          <template v-if="backArrow" #left>
            <van-icon name="arrow-left" class="enc-text-[18px]" @click="handleBack" />
          </template>
          <template v-else #left>
            <slot name="header-left" />
          </template>

          <template v-if="slots['header-title']" #title>
            <slot name="header-title" />
          </template>

          <template #right>
            <slot name="header-right" />
          </template>
        </van-nav-bar>
      </slot>
    </div>

    <!-- main -->
    <div
      ref="main"
      class="enc-layout-[vant]__main"
      :class="{
        'shim-top': !hasHeader,
        'shim-bottom': !hasFooter,
        'disable-scroll': disableScroll,
      }"
      @scroll="handleScroll"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchCancel"
    >
      <slot />
    </div>

    <!-- footer -->
    <div v-if="hasFooter" class="enc-layout-[vant]__footer">
      <slot name="footer" />
    </div>

    <!-- tabBar: can't coexist with footer -->
    <div v-if="showTabBar && !hasFooter" class="enc-layout-[vant]__tabbar__wrap">
      <van-tabbar route fixed placeholder safe-area-inset-bottom>
        <van-tabbar-item
          v-for="option in tabBarOptions"
          :key="option.routerPath"
          :to="option.routerPath"
          :icon="option.icon"
          replace
        >
          {{ option.title }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style>
:root {
  --enc-layout-header-background: var(--enc-primary-color);
  --enc-layout-header-text-color: #fff;
}
</style>

<style>
.enc-layout-\[vant\] {
  --van-nav-bar-background: var(--enc-layout-header-background);
  --van-nav-bar-title-text-color: var(--enc-layout-header-text-color);
  --van-nav-bar-icon-color: var(--enc-layout-header-text-color);

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--enc-background-color);

  &.android-p2v-ignore {
    /* 很多安卓设备没有 env(safe-area) 系列环境变量，使用固定顶部安全区  */
    --enc-safe-area-inset-top: 25px;
    /* 安卓底部存在虚拟按键条，无需适配 */
  }
}

.enc-layout-\[vant\]__header {
  flex: 0 0 auto;
}

.enc-layout-\[vant\]__main {
  flex: 1;
  /* only main scroll */
  overflow-x: hidden;
  overflow-y: auto;

  /* 无头部时的 layout__main 顶部安全区 */
  &.shim-top {
    padding-top: var(--enc-safe-area-inset-top);
  }
  /* layout__main 底部安全区 */
  &.shim-bottom {
    padding-bottom: var(--enc-safe-area-inset-bottom);
  }
  &.disable-scroll {
    overflow-y: hidden;
  }
}

.enc-layout-\[vant\]__footer {
  flex: 0 0 auto;
  padding-bottom: var(--enc-safe-area-inset-bottom);
}

.enc-layout-\[vant\]__tabbar__wrap {
  flex: 0 0 auto;
}
</style>
