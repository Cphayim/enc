// 在此引入 组件库所依赖的所有第三方组件，通过 install 方法一起安装掉
// 这样打包时，我们的组件类型中不会混合第三方组件的类型（这造成类型可读性变差）

// 工具
export { ElButton, ElRow, ElCol, ElIcon, ElMessage, ElNotification, ElPopover, ElDialog } from 'element-plus'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/col/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/dialog/style/css'

// 表单
export { ElForm, ElFormItem } from 'element-plus'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'

export { ElInput } from 'element-plus'
import 'element-plus/es/components/input/style/css'

export { ElSelect, ElSelectV2, ElOption, ElCascader } from 'element-plus'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/select-v2/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/cascader/style/css'

export { ElCheckbox, ElRadio } from 'element-plus'
import 'element-plus/es/components/checkbox/style/css'
import 'element-plus/es/components/radio/style/css'

export { ElUpload } from 'element-plus'
import 'element-plus/es/components/upload/style/css'
