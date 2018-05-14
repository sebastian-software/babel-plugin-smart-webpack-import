import pluginTester from 'babel-plugin-tester'
import createBabylonOptions from "babylon-options"

import thisPlugin from './'

const babelOptions = {
  filename: "currentFile.js",
  parserOpts: createBabylonOptions({
    sourceType: 'module',
    plugins: [ "dynamicImport" ]
  })
}

pluginTester({
  plugin: thisPlugin,
  babelOptions,
  snapshot: true,
  tests: {
    "Adds chunkname when missing": "import('./HelloView')"
  }
})
