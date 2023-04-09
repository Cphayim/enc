import { computed } from 'vue'

type DurationProps = {
  duration?: number | string
}
export function useDuration(props: DurationProps) {
  return computed(() =>
    typeof props.duration === 'number' ? `${props.duration}ms` : props.duration,
  )
}

export type TimingFunction = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
type TimingFunctionProps = {
  timingFunction?: TimingFunction
}
export function useTimingFunction(props: TimingFunctionProps) {
  return computed(() => props.timingFunction)
}
