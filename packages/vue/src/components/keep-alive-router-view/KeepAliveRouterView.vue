<script setup lang="ts">
defineOptions({ name: 'EncKeepAliveRouterView' })

type Props = {
  /**
   * 是否缓存所有路由
   */
  all?: boolean
  /**
   * 缓存的路由组件名称列表
   */
  includes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  all: false,
  includes: () => [],
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive v-if="props.all">
      <component :is="Component" />
    </keep-alive>
    <keep-alive v-else :include="props.includes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
