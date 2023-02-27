import { defineComponent } from 'vue'

export type CreateTestMockEncForm = {
  validate?: () => Promise<unknown>
  clearValidate?: (names?: string | string[]) => Promise<void>
  getValues?: () => Record<string, any>
}

export const createTestMockEncForm = ({
  validate = async () => undefined,
  clearValidate = async () => undefined,
  getValues = () => ({}),
}: CreateTestMockEncForm = {}) => {
  return defineComponent({
    name: 'EncForm',
    props: {
      data: Object,
      items: Array,
    },
    setup() {
      return {
        validate,
        clearValidate,
        getValues,
      }
    },
    template: '<div />',
  })
}
