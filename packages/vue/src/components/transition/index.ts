import { withInstall } from '../../install'
import Transition from './Transition.vue'
import Fade from './Fade.vue'
import Slide from './Slide.vue'

type ComposeTransition = typeof Transition & {
  Fade: typeof Fade
  Slide: typeof Slide
}

Transition.Fade = Fade
Transition.Slide = Slide

export const EncTransition = withInstall(Transition as ComposeTransition)
