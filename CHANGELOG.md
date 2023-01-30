## Changelog

### 0.1.7 (2023-01-30)

#### Features

**@cphayim-enc/vue**

- add `useEmitter` hook [#26](https://github.com/Cphayim/enc/pull/26)
- add base `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)

**@cphayim-enc/vue-element-plus**

- add `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)

**@cphayim-enc/vue-vant**

- add `useLoading` hook [#26](https://github.com/Cphayim/enc/pull/26)
- add `EncLayout` component [#26](https://github.com/Cphayim/enc/pull/26)
- add `EncRouterTransition` component [#26](https://github.com/Cphayim/enc/pull/26)

### 0.1.1 (2022-12-31)

#### Features

**@cphayim-enc/base**

- `CascaderFormItemOption` add `disabled` property

#### Bug fixes

**@cphayim-enc/vue-element-plus, @cphayim-enc/vue-vant**

- Delay `EncForm.clearValidate` method [#2](https://github.com/Cphayim/enc/pull/2)

### 0.1.0 (2022-12-30)

#### Features

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
