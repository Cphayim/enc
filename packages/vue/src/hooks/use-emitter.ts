import mitten, { type Emitter, type EventType } from '@ombro/mitten'

export type { Emitter }

export function useMitten<T extends Record<EventType, unknown>>() {
  return mitten<T>()
}

export function useEmitter<T extends Record<EventType, unknown>>() {
  return useMitten<T>()
}
