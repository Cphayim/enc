# 更新日志

## 0.2.13 (2023-06-01)

### Features

**@cphayim-enc/base**

- `BizFormHelper` 提供的过滤方法支持 `matchingRule` [#107](https://github.com/Cphayim/enc/pull/107)
- 优化了表单项组合类型的结构 [#107](https://github.com/Cphayim/enc/pull/107)
  - `OmitPartialFormItem` 重命名为 `PartialFormItemIntersectionWithoutNameAndType`
- 添加 `FormAnalyzer` 和 `BizFormAnalyzer`，用于复杂表单项的分析器 [#107](https://github.com/Cphayim/enc/pull/107)

**@cphayim-enc/extension-form-editor**
**@cphayim-enc/extension-vue-form-editor**

- 添加 `FormEditorConfig.syncOptionsLabelAndValue` 选项，在含有选项的编辑面板中支持键值同步（例如 `Select`, `Checkbox`, `Redio` 等）[#107](https://github.com/Cphayim/enc/pull/107)
- 添加 `FormEditorBizFeature.bizSingleton` 选项，用于限制 `bizFeature` 在编辑器中的使用次数 [#107](https://github.com/Cphayim/enc/pull/107)

### Dependencies

更新依赖 [#108](https://github.com/Cphayim/enc/pull/108)

## 0.2.12 (2023-05-11)

### Features

**@cphayim-enc/vue-element-plus**

- `EncCascaderFormItem` 组件支持 `cascaderFilterable` 属性 [#105](https://github.com/Cphayim/enc/pull/105)

## 0.2.11 (2023-05-10)

### Features

**@cphayim-enc/base**

- 定义了 `RateFormItem` 接口 [#103](https://github.com/Cphayim/enc/pull/103)

**@cphayim-enc/vue-element-plus**
**@cphayim-enc/vue-vant**

- `EncForm` 组件新增 props `labelPosition`，允许设置为 `top` 使 label 和表单控件垂直排列 [#102](https://github.com/Cphayim/enc/pull/102)
- 新增了 `EncRateFormItem` 组件，实现 `RateFormItem` [#103](https://github.com/Cphayim/enc/pull/103)

**@cphayim-enc/extension-form-editor**

- 添加了 rate 的预设 [#103](https://github.com/Cphayim/enc/pull/103)

**@cphayim-enc/extension-vue-form-editor**

- `EncFormEditor` 组件支持 `rate` [#103](https://github.com/Cphayim/enc/pull/103)

## Bug fixes

**@cphayim-enc/style**

- 修复滚动条圆角样式问题 [#103](https://github.com/Cphayim/enc/pull/103)

**@cphayim-enc/extension-vue-form-editor**

- 修复外部重置样式可能导致的样式问题 [#101](https://github.com/Cphayim/enc/pull/101)

## 0.2.10 (2023-04-26)

### Dependencies

更新依赖 [#95](https://github.com/Cphayim/enc/pull/95), [#96](https://github.com/Cphayim/enc/pull/96)

## 0.2.9 (2023-04-18)

### Features

**@cphayim-enc/base**

- `BizFormHelper` 提供了一些工具函数 [#92](https://github.com/Cphayim/enc/pull/92)

**@cphayim-enc/vue**

- 添加 `useCountEvent` 钩子，它维护一个内部计数，每次调用返回的包装函数时，计数都会递增。 当存在匹配的 compareNumber 时，会触发对应的回调函数 [#88](https://github.com/Cphayim/enc/pull/88)
- 添加 `EncTransition.Zoom` 组件 [#91](https://github.com/Cphayim/enc/pull/91)

### Dependencies

更新依赖 [#82](https://github.com/Cphayim/enc/pull/82)

## 0.2.8 (2023-04-10)

### Bug fixes

**@cphayim-enc/vue-element-plus**

**@cphayim-enc/vue-vant**

- 导出上游组件 [#85](https://github.com/Cphayim/enc/pull/85)

## 0.2.6 (2023-04-10)

### Features

**@cphayim-enc/style**

- 导出 `EncCSSVariables` [#81](https://github.com/Cphayim/enc/pull/81)

**`@cphayim-enc/vue`**

- 添加 `EncTransition`, 现在可以使用 `EncTransition.Fade` 和 `EncTransition.Slide` 组件 [#81](https://github.com/Cphayim/enc/pull/81)

## 0.2.5 (2023-04-09)

### Adjusted

**@cphayim-enc/style**

**@cphayim-enc/vue**

**@cphayim-enc/vue-element-plus**

**@cphayim-enc/vue-vant**

**@cphayim-enc/extension-vue-form-editor**

- `@cphayim-enc/style` 成为新的公共层包（同 `@cphayim-enc/base` 位于一层），此包仅包含样式，不含逻辑代码 [#79](https://github.com/Cphayim/enc/pull/79)
- 框架层包依赖 `@cphayim-enc/style`，并附带自己的样式 [#79](https://github.com/Cphayim/enc/pull/79)
- UI 层包依赖 `@cphayim-enc/{framework}/style`，并附带自己的样式 [#79](https://github.com/Cphayim/enc/pull/79)
- 优化了包的 `./style` 导出，将包含上层的所有样式（例如导入 UI 层包的 `./style`，将同时导入 `@cphayim-enc/style` 以及 UI 层包对应的框架层包样式） [#79](https://github.com/Cphayim/enc/pull/79)

### Dependencies

更新依赖 [#77](https://github.com/Cphayim/enc/pull/77), [#78](https://github.com/Cphayim/enc/pull/78)

## 0.2.4 (2023-03-30)

### Features

**`@cphayim-enc/vue`**

- 添加 `EncKeepAliveRouterView` 组件 [#73](https://github.com/Cphayim/enc/pull/73)

### Adjusted

**`@cphayim-enc/vue-element-plus`**

- 默认提供更细的滚动条样式 [#74](https://github.com/Cphayim/enc/pull/74)

## 0.2.3 (2023-03-28)

### Bug fixes

**`@cphayim-enc/vue`**

**`@cphayim-enc/vue-element-plus`**

**`@cphayim-enc/vue-vant`**

- 导出 `usePagination` hook [#71](https://github.com/Cphayim/enc/pull/71)

## 0.2.2 (2023-03-28)

### Features

**`@cphayim-enc/vue`**

- `usePagination` 导出函数 `resetPaginationKeepPageSize` [#68](https://github.com/Cphayim/enc/pull/68)

### Dependencies

更新依赖 [#69](https://github.com/Cphayim/enc/pull/69)

## 0.2.1 (2023-03-24)

### Bug fixes

- `structuredClone` 不支持 `Proxy` 对象 [#66](https://github.com/Cphayim/enc/pull/66)

### Dependencies

更新依赖 [#64](https://github.com/Cphayim/enc/pull/64)

## 0.2.0 (2023-03-16)

### Features

**`@cphayim-enc/base`**

- 添加 `biz-form` 相关类型 [#42](https://github.com/Cphayim/enc/pull/42)

**@cphayim-enc/extension-form-editor**

- 添加 `form-editor` 相关类型 [#42](https://github.com/Cphayim/enc/pull/42)
- 添加 `form-editor` 相关基本配置和帮助函数 [#42](https://github.com/Cphayim/enc/pull/42)

**@cphayim-enc/extension-vue-form-editor**

- 添加 `EncFormEditor` 组件 [#42](https://github.com/Cphayim/enc/pull/42)

### Dependencies

更新依赖 [#62](https://github.com/Cphayim/enc/pull/62)

## 0.1.15 (2023-03-10)

### Bug fixes

**@cphayim-enc/vue-element-plus**

- 修复了 `uploadAccept` 逻辑判断 [#60](https://github.com/Cphayim/enc/pull/60)

**@cphayim-enc/vue-vant**

- 修复了 `uploadAccept` 逻辑判断 [#60](https://github.com/Cphayim/enc/pull/60)

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
