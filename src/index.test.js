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
    "Adds chunkname when missing": "import('./HelloView')",
    "Keeps chunkName simple even for longer paths": "import('./views/admin/SettingsView')",
    "Keeps existing comments": "import(/* keep me */ './HelloView')",
    "Adds chunkName to existing magic comment": "import(/* webpackPrefetch: true */ './HelloView')",
    "Don't overwrites manual chunkName": "import(/* webpackChunkName: 'CustomHello' */ './HelloView')",
  }
})
