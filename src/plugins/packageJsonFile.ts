/*
 * We create a file `dist/server/package.json` to support ESM users.
 * Otherwise, following error is thrown:
 *   Must use import to load ES Module: dist/server/pageFiles.js
 *   require() of ES modules is not supported.
 *   require() of dist/server/pageFiles.js from node_modules/vite-plugin-ssr/dist/cjs/node/page-files/setup.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
 * Reproduction: https://github.com/brillout/vite-plugin-ssr-server-import-syntax
 */

export { packageJsonFile }

import type { Plugin, ResolvedConfig } from 'vite'
import { viteIsSSR, rollupIsEsm } from '../utils'

// This plugin can be included several times
function packageJsonFile(): Plugin {
  let config: ResolvedConfig
  return {
    name: '@brillout/vite:packageJsonFile',
    apply: 'build',
    configResolved(config_) {
      config = config_
    },
    generateBundle(options, bundle) {
      if (!viteIsSSR(config)) return
      const isEsm = rollupIsEsm(options)
      const fileName = 'package.json'
      if (bundle[fileName]) return // May have already been generated, if this plugin was included several times
      this.emitFile({
        fileName,
        type: 'asset',
        source: getPackageJsonContent(isEsm)
      })
    }
  } as Plugin
}

function getPackageJsonContent(isEsm: boolean): string {
  if (isEsm) {
    return `{ "type": "module" }`
  } else {
    return `{ "type": "commonjs" }`
  }
}
