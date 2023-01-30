import mitt from 'mitt'

export function useEmitter<T extends Record<string | symbol, unknown>>() {
  return mitt<T>()
}
