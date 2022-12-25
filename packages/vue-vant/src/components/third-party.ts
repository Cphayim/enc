// 在此引入 组件库所依赖的所有第三方组件，通过 install 方法一起安装掉
// 这样打包时，我们的组件类型中不会混合第三方组件的类型（这造成类型可读性变差）

// 工具
export { Popup, Picker, Toast } from 'vant'
import 'vant/es/popup/style/index'
import 'vant/es/picker/style/index'
import 'vant/es/toast/style/index'

// 表单
export { Form } from 'vant'
import 'vant/es/form/style/index'

export { CellGroup, Field } from 'vant'
import 'vant/es/cell-group/style/index'
import 'vant/es/field/style/index'

export { DatePicker } from 'vant'
import 'vant/es/date-picker/style/index'
