import { withInstall } from '../../install'
import Transition from './Transition.vue'
import Fade from './Fade.vue'
import Slide from './Slide.vue'
import Zoom from './Zoom.vue'

type ComposeTransition = typeof Transition & {
  Fade: typeof Fade
  Slide: typeof Slide
  Zoom: typeof Zoom
}

Transition.Fade = Fade
Transition.Slide = Slide
Transition.Zoom = Zoom

export const EncTransition = withInstall(Transition as ComposeTransition)
