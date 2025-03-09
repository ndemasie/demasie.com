import { glslify } from 'vite-plugin-glslify'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [glslify(), tsconfigPaths()],
}
