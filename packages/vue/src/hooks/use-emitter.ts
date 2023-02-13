import mitt, { Emitter } from 'mitt'

export type { Emitter }

export function useEmitter<T extends Record<string | symbol, unknown>>() {
  return mitt<T>()
}
