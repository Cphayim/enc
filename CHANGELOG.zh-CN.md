# 更新日志

## 0.1.14 (2023-03-09)

### Dependencies

更新依赖 [#52](https://github.com/Cphayim/enc/pull/52), [#54](https://github.com/Cphayim/enc/pull/54)

## 0.1.13 (2023-03-09)

### Bug fixes

**@cphayim-enc/vue-vant**

- 修复了 `EncLayout` 组件头部安全区域在安卓上失效问题 [#56](https://github.com/Cphayim/enc/pull/56)

## 0.1.12 (2023-02-20)

### Features

**@cphayim-enc/vue-vant**

- `EncLayout` 组件添加 `header-title` 插槽 [#50](https://github.com/Cphayim/enc/pull/50)

### Dependencies

更新依赖 [#46](https://github.com/Cphayim/enc/pull/46), [#49](https://github.com/Cphayim/enc/pull/49)

## 0.1.11 (2023-02-16)

### Features

**@cphayim-enc/vue-vant**

- `EncLayout` 组件添加 `onBack` props, 它能够定义 `backArrow` 的处理逻辑 [#47](https://github.com/Cphayim/enc/pull/47)

### Dependencies

更新依赖 [#41](https://github.com/Cphayim/enc/pull/41), [#43](https://github.com/Cphayim/enc/pull/43)

## 0.1.10 (2023-02-07)

### Features

**@cphayim-enc/vue**

- 添加基本 `useConfirm` hook [#34](https://github.com/Cphayim/enc/pull/34)
- 添加 `usePagination` hook [#35](https://github.com/Cphayim/enc/pull/35)

**@cphayim-enc/vue-element-plus**

- 添加 `useConfirm` hook [#34](https://github.com/Cphayim/enc/pull/34)

**@cphayim-enc/vue-vant**

- 添加 `useConfirm` hook [#34](https://github.com/Cphayim/enc/pull/34)
- `EncInputFormItem` 支持显示必填红点 [#33](https://github.com/Cphayim/enc/pull/33)

### Bug fixes

**@cphayim-enc/vue-element-plus**

- `useLoading` 可选参数 [#32](https://github.com/Cphayim/enc/pull/32)

**@cphayim-enc/vue-vant**

- `useLoading` 可选参数 [#32](https://github.com/Cphayim/enc/pull/32)
- `EncLayout` icon 支持相对值转换 [#32](https://github.com/Cphayim/enc/pull/32)

### Dependencies

更新依赖 [#36](https://github.com/Cphayim/enc/pull/36), [#39](https://github.com/Cphayim/enc/pull/39)

## 0.1.9 (2023-02-01)

### Bug fixes

**@cphayim-enc/vue-vant**

- 修复了 `useLoading` hook 未导出问题 [#31](https://github.com/Cphayim/enc/pull/31)

## 0.1.8 (2023-02-01)

### Bug fixes

**@cphayim-enc/vue-element-plus**

- 修复 `useLoading` hook 默认的 `onLoading` 丢失的返回标记 [#19](https://github.com/Cphayim/enc/pull/19)

**@cphayim-enc/vue-vant**

- 修复 `useLoading` hook 默认的 `onLoading` 丢失的返回标记 [#19](https://github.com/Cphayim/enc/pull/19)

## 0.1.7 (2023-01-30)

### Features

**@cphayim-enc/vue**

- 添加 `useEmitter` hook [#26](https://github.com/Cphayim/enc/pull/26)
- 添加基本 `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)

**@cphayim-enc/vue-element-plus**

- 添加 `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)

**@cphayim-enc/vue-vant**

- 添加 `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)
- 添加 `EncLayout` 组件 [#26](https://github.com/Cphayim/enc/pull/26)
- 添加 `EncRouterTransition` 组件 [#26](https://github.com/Cphayim/enc/pull/26)

## 0.1.1 (2022-12-31)

### Features

**@cphayim-enc/base**

- `CascaderFormItemOption` 添加 `disabled` 属性

### Bug fixes

**@cphayim-enc/vue-element-plus, @cphayim-enc/vue-vant**

- 延迟执行 `EncForm.clearValidate` 方法 [#2](https://github.com/Cphayim/enc/pull/2)

## 0.1.0 (2022-12-30)

### Features

[#1](https://github.com/Cphayim/enc/pull/1)

**@cphayim-enc/base (base-package)**

- 定义接口 `BaseFormItem`、`InputFormItem`、`SelectFormItem`、`CascaderFormItem`、`DateFormItem`、`TimeFormItem`、`SwitchFormItem`、`RadioFormItem`、`CheckboxFormItem`、`UploadFormItem`、`CustomFormItem`
- 实现 `ImageUtils` 工具

**@cphayim-enc/vue (framework-package)**

- 提供 Vue 组件包装安装器函数 `withInstall` 和批量安装函数 `usingSFCWithInstall`
- 提供了 `useEventLock` 和基础版 `useForm` hooks

**@cphayim-enc/vue-element-plus (ui-package)**

- 基于 element-plus 和 base-package 接口定义实现了 `EncForm` 和 `EncFormItem` 组件
- 基于 element-plus 和 base-package 接口定义实现了 `EncInputFormItem`、`EncSelectFormItem`、`EncCascaderFormItem`、`EncDateFormItem`、`EncTimeFormItem`、`EncSwitchFormItem`、`EncRadioFormItem`、`EncCheckboxFormItem`、`EncUploadFormItem` 组件
- 提供了增强的 `useForm` hooks（针对当前 ui-package）

**@cphayim-enc/vue-vant (ui-package)**

- 基于 vant 和 base-package 接口定义实现了 `EncForm` 和 `EncFormItem` 组件
- 基于 vant 和 base-package 接口定义实现了 `EncInputFormItem`、`EncSelectFormItem`、`EncCascaderFormItem`、`EncDateFormItem`、`EncTimeFormItem`、`EncSwitchFormItem`、`EncRadioFormItem`、`EncCheckboxFormItem`、`EncUploadFormItem` 组件
- 提供了增强的 `useForm` hooks（针对当前 ui-package）
