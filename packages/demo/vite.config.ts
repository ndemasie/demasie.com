import glsl from 'vite-plugin-glsl'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [glsl(), tsconfigPaths()],
}
