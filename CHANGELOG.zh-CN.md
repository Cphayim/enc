## 更新日志

### 0.1.1 (2022-12-31)

#### Features

**@cphayim-enc/base**

- `CascaderFormItemOption` 添加 `disabled` 属性

#### Bug fixes

**@cphayim-enc/vue-element-plus, @cphayim-enc/vue-vant**

- 延迟执行 `EncForm.clearValidate` 方法 [#2]

### 0.1.0 (2022-12-30)

#### Features

[#1]

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
