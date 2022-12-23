<script setup lang="ts">
import { computed, ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { ElMessage, UploadRequestOptions } from 'element-plus'

import {
  BaseFormItem,
  defaultUploadTransformer,
  UploadedFile,
  UploadFormItem,
  UploadTransformerHelper,
  verifyUploadedFile,
} from '@cphayim-enc/base'
import { createThrowErrorFunction } from '@cphayim-enc/shared'

defineOptions({ name: 'EncUploadFormItem' })

const props = defineProps<{
  modelValue: any
  item: UploadFormItem
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: any): void }>()

const DEFAULT_OPTIONS: Omit<UploadFormItem, Exclude<keyof BaseFormItem, 'placeholder'>> = {
  placeholder: '请选择',
  uploadType: 'file',
  uploadButtonText: '上传文件',
  uploadButtonColor: '#337ecc',
  uploadValidate: () => true,
  // 这个方法是可选值，但必须由用户传入
  uploadSend: createThrowErrorFunction('`UploadFormItem.uploadSend` is not implemented'),
  uploadTransformer: defaultUploadTransformer,
}
const item = computed(() => ({ ...DEFAULT_OPTIONS, ...props.item }))

const fileList = computed<UploadedFile[]>(() =>
  UploadTransformerHelper.fromRaw(props.modelValue, item.value.uploadTransformer!),
)

// 校验
const handleUploadValidate = (file: File) => {
  try {
    const result = item.value.uploadValidate!(file)
    if (result === true) return true
    ElMessage.error({ message: result as string, duration: 3000 })
    throw new Error(result as string)
  } catch (error) {
    console.error(error)
    return false
  }
}

// 上传发送
const handleUploadSend = async (options: UploadRequestOptions) => {
  try {
    // 发送请求拿到 UploadedFile
    const file = await item.value.uploadSend!(options.file)
    verifyUploadedFile(file)
    const files = [...fileList.value, file]
    const raw = UploadTransformerHelper.toRaw(files, item.value.uploadTransformer!)
    console.log(raw)
    emit('update:modelValue', raw)
  } catch (error) {
    console.error(error)
    throw error
  }
}

// 删除
const handleRemove = (_: UploadedFile, restFiles: UploadedFile[]) => {
  // // 剩余的
  // const rest = restFiles.map((f) => ({ name: f.name, url: f.url }))

  const raw = UploadTransformerHelper.toRaw(restFiles, item.value.uploadTransformer!)
  emit('update:modelValue', raw)
}

// 超限提示
const handleExceed = () => {
  ElMessage.warning({ message: '已达到上传数量限制' })
}

const dialogImageUrl = ref()
const dialogVisible = ref(false)
// 预览
const handlePreview = (file: UploadedFile) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
</script>

<template>
  <div class="enc-upload">
    <el-upload
      ref="uploadRef"
      action="/"
      :accept="item.uploadType === 'image' ? 'image/*' : '*'"
      :file-list="fileList"
      :before-upload="handleUploadValidate"
      :http-request="handleUploadSend"
      :limit="item.uploadLimit"
      :on-remove="handleRemove"
      :list-type="item.uploadType === 'image' ? 'picture-card' : 'text'"
      :on-preview="item.uploadType === 'image' ? handlePreview : undefined"
      :on-exceed="handleExceed"
      :disabled="item.disabled"
      :readonly="item.readonly"
    >
      <el-icon v-if="item.uploadType === 'image'"><Plus /></el-icon>
      <el-button v-else type="primary" :color="item.uploadButtonColor" :icon="Upload">
        {{ item.uploadButtonText || '上传文件' }}
      </el-button>

      <template v-if="item.uploadTips" #tip>
        <pre class="enc-upload__tip">{{ item.uploadTips }}</pre>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style>
.enc-upload {
  .enc-upload__tip {
    @apply enc-leading-[20px] enc-text-gray-500;
  }
  .el-upload-list__item,
  .el-upload-list--picture-card .el-upload-list__item-actions {
    @apply enc-transition-none;
  }
  .el-icon--close-tip {
    display: none !important;
  }
  .el-upload-list {
    @apply enc-min-w-[300px];
  }
}
</style>
