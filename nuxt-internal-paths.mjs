/**
 * Shim so Node can resolve `#internal/nuxt/paths` (see package.json "imports").
 * Nuxt's SSR bundle references this specifier; Node requires a local mapping.
 */
export {
  baseURL,
  buildAssetsDir,
  buildAssetsURL,
  publicAssetsURL,
} from './node_modules/@nuxt/nitro-server/dist/runtime/utils/paths.mjs'
