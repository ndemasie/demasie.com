import Drawer from './Drawer.vue'
import DrawerContent from './DrawerContent.vue'
import DrawerDescription from './DrawerDescription.vue'
import DrawerFooter from './DrawerFooter.vue'
import DrawerHeader from './DrawerHeader.vue'
import DrawerOverlay from './DrawerOverlay.vue'
import DrawerTitle from './DrawerTitle.vue'
export { DrawerClose, DrawerPortal, DrawerTrigger } from 'vaul-vue'

export default Object.assign(Drawer, {
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Overlay: DrawerOverlay,
  Title: DrawerTitle,
})

export {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
}
