import { defineComponent } from 'vue'

export type CreateTestMockEncFormOptions = {
  validate?: () => Promise<unknown>
  clearValidate?: (names?: string | string[]) => Promise<void>
  getValues?: () => Record<string, any>
}

export const createTestMockEncForm = ({
  validate = async () => undefined,
  clearValidate = async () => undefined,
  getValues = () => ({}),
}: CreateTestMockEncFormOptions = {}) => {
  return defineComponent({
    name: 'EncForm',
    props: {
      data: Object,
      items: Array,
    },
    setup(props, { emit }) {
      const updateValueByName = (name: string, value: any) => {
        emit('update:data', {
          ...props.data,
          [name]: value,
        })
      }
      return {
        validate,
        clearValidate,
        getValues,
        updateValueByName, // for test
      }
    },
    template: '<div />',
  })
}
