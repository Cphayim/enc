# Changelog

## 0.2.9 (2023-04-18)

### Features

**@cphayim-enc/base**

- `BizFormHelper` provides some utility functions [#92](https://github.com/Cphayim/enc/pull/92)

**@cphayim-enc/vue**

- add `useCountEvent` hook, it maintains an internal count, and each time the returned wrapped function is called, the count will be incremented. When a matching compareNumber exists, the corresponding callback function will be triggered [#88](https://github.com/Cphayim/enc/pull/88)
- add `EncTransition.Zoom` component [#91](https://github.com/Cphayim/enc/pull/91)

### Dependencies

Update dependencies [#82](https://github.com/Cphayim/enc/pull/82)

## 0.2.8 (2023-04-10)

### Bug fixes

**@cphayim-enc/vue-element-plus**

**@cphayim-enc/vue-vant**

- export upstream components [#85](https://github.com/Cphayim/enc/pull/85)

## 0.2.6 (2023-04-10)

### Features

**@cphayim-enc/style**

- export `EncCSSVariables` [#81](https://github.com/Cphayim/enc/pull/81)

**`@cphayim-enc/vue`**

- add `EncTransition`, can now use `EncTransition.Fade` and `EncTransition.Slide` components [#81](https://github.com/Cphayim/enc/pull/81)

## 0.2.5 (2023-04-09)

### Adjusted

**@cphayim-enc/style**

**@cphayim-enc/vue**

**@cphayim-enc/vue-element-plus**

**@cphayim-enc/vue-vant**

**@cphayim-enc/extension-vue-form-editor**

- `@cphayim-enc/style` becomes the new common style package (located in the same layer as `@cphayim-enc/base`), which only contains styles and not logic code. [#79](https://github.com/Cphayim/enc/pull/79)
- The framework layer package depends on `@cphayim-enc/style` and includes its own styles. [#79](https://github.com/Cphayim/enc/pull/79)
- The UI layer package depends on `@cphayim-enc/{framework}/style` and includes its own styles. [#79](https://github.com/Cphayim/enc/pull/79)
- Optimized the `./style` export of the packages to include all styles from the upper layer (for example, importing the `./style` of a UI layer package will also import the styles from `@cphayim-enc/style` and the corresponding framework layer package). [#79](https://github.com/Cphayim/enc/pull/79)

### Dependencies

Update dependencies [#77](https://github.com/Cphayim/enc/pull/77), [#78](https://github.com/Cphayim/enc/pull/78)

## 0.2.4 (2023-03-30)

### Features

**`@cphayim-enc/vue`**

- add `EncKeepAliveRouterView` component [#73](https://github.com/Cphayim/enc/pull/73)

### Adjusted

**`@cphayim-enc/vue-element-plus`**

- a thin scrollbar style is provided by default [#74](https://github.com/Cphayim/enc/pull/74)

## 0.2.3 (2023-03-28)

### Bug fixes

**`@cphayim-enc/vue`**

**`@cphayim-enc/vue-element-plus`**

**`@cphayim-enc/vue-vant`**

- export `usePagination` hook [#71](https://github.com/Cphayim/enc/pull/71)

## 0.2.2 (2023-03-28)

### Features

**`@cphayim-enc/vue`**

- `usePagination` export function `resetPaginationKeepPageSize` [#68](https://github.com/Cphayim/enc/pull/68)

### Dependencies

Update dependencies [#69](https://github.com/Cphayim/enc/pull/69)

## 0.2.1 (2023-03-24)

### Bug fixes

- `structuredClone` not support `Proxy` objects [#66](https://github.com/Cphayim/enc/pull/66)

### Dependencies

Update dependencies [#64](https://github.com/Cphayim/enc/pull/64)

## 0.2.0 (2023-03-16)

### Features

**`@cphayim-enc/base`**

- add `biz-form` related types [#42](https://github.com/Cphayim/enc/pull/42)

**@cphayim-enc/extension-form-editor**

- add `form-editor` related types [#42](https://github.com/Cphayim/enc/pull/42)
- add `form-editor` related base config and helper function [#42](https://github.com/Cphayim/enc/pull/42)

**@cphayim-enc/extension-vue-form-editor**

- add `EncFormEditor` component [#42](https://github.com/Cphayim/enc/pull/42)

### Dependencies

Update dependencies [#62](https://github.com/Cphayim/enc/pull/62)

## 0.1.15 (2023-03-10)

### Bug fixes

**@cphayim-enc/vue-element-plus**

- Fixed logical judgment of `uploadAccept` [#60](https://github.com/Cphayim/enc/pull/60)

**@cphayim-enc/vue-vant**

- Fixed logical judgment of `uploadAccept` [#60](https://github.com/Cphayim/enc/pull/60)

## 0.1.14 (2023-03-09)

### Dependencies

Update dependencies [#52](https://github.com/Cphayim/enc/pull/52), [#54](https://github.com/Cphayim/enc/pull/54)

## 0.1.13 (2023-03-09)

### Bug fixes

**@cphayim-enc/vue-vant**

- Fixed the header safe area of the `EncLayout` component being ineffective on Android [#56](https://github.com/Cphayim/enc/pull/56)

## 0.1.12 (2023-02-20)

### Features

**@cphayim-enc/vue-vant**

- `EncLayout` component add `header-title` slot [#50](https://github.com/Cphayim/enc/pull/50)

### Dependencies

Update dependencies [#46](https://github.com/Cphayim/enc/pull/46), [#49](https://github.com/Cphayim/enc/pull/49)

## 0.1.11 (2023-02-16)

### Features

**@cphayim-enc/vue-vant**

- `EncLayout` component add `onBack` props, can use it to define the logic of `backArrow` [#47](https://github.com/Cphayim/enc/pull/47)

### Dependencies

Update dependencies [#41](https://github.com/Cphayim/enc/pull/41), [#43](https://github.com/Cphayim/enc/pull/43)

## 0.1.10 (2023-02-07)

### Features

**@cphayim-enc/vue**

- add base `useConfirm` hook [#34](https://github.com/Cphayim/enc/pull/34)
- add `usePagination` hook [#35](https://github.com/Cphayim/enc/pull/35)

**@cphayim-enc/vue-element-plus**

- add `useConfirm` hook [#34](https://github.com/Cphayim/enc/pull/34)

**@cphayim-enc/vue-vant**

- add `useConfirm` hook [#34](https://github.com/Cphayim/enc/pull/34)
- `EncInputFormItem` support for display required red dots [#33](https://github.com/Cphayim/enc/pull/33)

### Bug fixes

**@cphayim-enc/vue-element-plus**

- `useLoading` optional parameters [#32](https://github.com/Cphayim/enc/pull/32)

**@cphayim-enc/vue-vant**

- `useLoading` optional parameters [#32](https://github.com/Cphayim/enc/pull/32)
- `EncLayout` icon support relative value conversion [#32](https://github.com/Cphayim/enc/pull/32)

### Dependencies

Update dependencies [#36](https://github.com/Cphayim/enc/pull/36), [#39](https://github.com/Cphayim/enc/pull/39)

## 0.1.9 (2023-02-01)

### Bug fixes

**@cphayim-enc/vue-vant**

- fixed not export `useLoading` hook [#31](https://github.com/Cphayim/enc/pull/31)

## 0.1.8 (2023-02-01)

### Bug fixes

**@cphayim-enc/vue-element-plus**

- fixed the missing return flag of the default `onLoading` in `useLoading` hook [#19](https://github.com/Cphayim/enc/pull/19)

**@cphayim-enc/vue-vant**

- fixed the missing return flag of the default `onLoading` in `useLoading` hook [#19](https://github.com/Cphayim/enc/pull/19)

## 0.1.7 (2023-01-30)

### Features

**@cphayim-enc/vue**

- add `useEmitter` hook [#26](https://github.com/Cphayim/enc/pull/26)
- add base `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)

**@cphayim-enc/vue-element-plus**

- add `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)

**@cphayim-enc/vue-vant**

- add `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)
- add `EncLayout` component [#26](https://github.com/Cphayim/enc/pull/26)
- add `EncRouterTransition` component [#26](https://github.com/Cphayim/enc/pull/26)

## 0.1.1 (2022-12-31)

### Features

**@cphayim-enc/base**

- `CascaderFormItemOption` add `disabled` property

### Bug fixes

**@cphayim-enc/vue-element-plus, @cphayim-enc/vue-vant**

- Delay `EncForm.clearValidate` method [#2](https://github.com/Cphayim/enc/pull/2)

## 0.1.0 (2022-12-30)

### Features

[#1](https://github.com/Cphayim/enc/pull/1)

**@cphayim-enc/base (base-package)**

- Define interfaces `BaseFormItem`, `InputFormItem`, `SelectFormItem`, `CascaderFormItem`, `DateFormItem`, `TimeFormItem`, `SwitchFormItem`, `RadioFormItem`, `CheckboxFormItem`, `UploadFormItem`, `CustomFormItem`
- implement the `ImageUtils` utility

**@cphayim-enc/vue (framework-package)**

- Provide Vue component packaging installer function `withInstall` and batch installation function `usingSFCWithInstall`
- Provides `useEventLock` and basic `useForm` hooks

**@cphayim-enc/vue-element-plus (ui-package)**

- Implemented `EncForm` and `EncFormItem` components based on element-plus and base-package interface definitions
- Implemented `EncInputFormItem`, `EncSelectFormItem`, `EncCascaderFormItem`, `EncDateFormItem`, `EncTimeFormItem`, `EncSwitchFormItem`, `EncRadioFormItem`, `EncCheckboxFormItem`Upload`Form, `Enc
- Provides enhanced `useForm` hooks (for current ui-package)

**@cphayim-enc/vue-vant (ui-package)**

- Implemented `EncForm` and `EncFormItem` components based on vant and base-package interface definitions
- Implemented `EncInputFormItem`, `EncSelectFormItem`, `EncCascaderFormItem`, `EncDateFormItem`, `EncTimeFormItem`, `EncSwitchFormItem`, `EncRadioFormItem`, `EncCheckboxFormItem`, `EncUpload` FormItem components based on vant and base-package interface definitions
- Provides enhanced `useForm` hooks (for current ui-package)
