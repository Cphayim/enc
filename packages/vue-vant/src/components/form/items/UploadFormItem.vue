<script setup lang="ts">
import { computed } from 'vue'
import { showToast } from 'vant'

import {
  BaseFormItem,
  defaultUploadTransformer,
  UploadedFile,
  UploadFormItem,
  UploadTransformerHelper,
  verifyUploadedFile,
} from '@cphayim-enc/base'
import { createThrowErrorFunction, log } from '@cphayim-enc/shared'

import EncInputFormItem from './InputFormItem.vue'

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
const uploadAccept = computed(() =>
  item.value.uploadAccept ?? item.value.uploadType === 'image' ? 'image/*' : '*',
)

const _uploadedFileList = computed<UploadedFile[]>({
  get: () => {
    const uploadedFileList = UploadTransformerHelper.fromRaw(
      props.modelValue,
      item.value.uploadTransformer!,
    )
    return item.value.uploadType === 'image'
      ? // 当 url 不以图片后缀结尾时，vant 根据 isImage 来判断是否是图片
        uploadedFileList.map((item) => ({ ...item, isImage: true }))
      : uploadedFileList
  },
  set: (files: UploadedFile[]) => {
    const raw = UploadTransformerHelper.toRaw(files, item.value.uploadTransformer!)
    emit('update:modelValue', raw)
  },
})

// 校验
const handleUploadValidate = (file: File) => {
  try {
    const result = item.value.uploadValidate!(file)
    if (result === true) return true
    showToast({ message: result as string, duration: 3000 })
    throw new Error(result as string)
  } catch (error) {
    log.error(error)
    return false
  }
}

// 上传
const handleUploadSend = async (file: File) => {
  try {
    // 发送请求拿到 UploadedFile
    const uploadedFile = await item.value.uploadSend!(file)
    // 当返回 string 代表错误消息
    if (typeof uploadedFile === 'string') throw new Error(uploadedFile)
    verifyUploadedFile(uploadedFile)

    const files = [..._uploadedFileList.value, uploadedFile]
    const raw = UploadTransformerHelper.toRaw(files, item.value.uploadTransformer!)
    emit('update:modelValue', raw)
  } catch (error) {
    log.error(error)
    showToast({ message: error.message, duration: 3000 })
  }
}

// 自定义处理上传任务
// 该函数始终返回 false，阻止 vant 的默认的上传行为
const handleFileUploadTask = async (file: File | File[]): Promise<never> => {
  // 只处理单个文件
  file = Array.isArray(file) ? file[0] : file
  // 1.校验
  if (!handleUploadValidate(file)) {
    return Promise.reject()
  }

  await handleUploadSend(file)
  return Promise.reject()
}
</script>

<template>
  <div class="enc-upload">
    <EncInputFormItem
      :modelValue="_uploadedFileList.map((i) => i.url).join(',')"
      :item="(item as any)"
      _readonly
    >
      <template #input></template>
    </EncInputFormItem>

    <div class="enc-upload-content">
      <van-uploader
        v-model="_uploadedFileList"
        :accept="uploadAccept"
        :max-count="item.uploadLimit"
        :before-read="handleFileUploadTask"
        :disabled="item.disabled"
        :readonly="item.readonly"
      >
      </van-uploader>
      <pre class="enc-upload-tip">{{ item.uploadTips }}</pre>
    </div>
  </div>
</template>

<style>
.enc-upload {
  font-size: var(--enc-switch-size);
  .van-cell {
    &::after {
      @apply enc-hidden;
    }
  }
}
.enc-upload-header {
  color: var(--van-field-label-color);
  font-size: var(--van-cell-font-size);
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
.enc-upload-content {
  padding: 0 var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
}
.enc-upload-tip {
  color: var(--van-text-color-3);
  font-size: var(--van-field-error-message-font-size);
}
</style>
