/* eslint-disable no-template-curly-in-string */
import createBabylonOptions from "babylon-options"
import pluginTester from "babel-plugin-tester"

import thisPlugin from "./"

const babelOptions = {
  filename: "current/folder/currentFile.js",
  parserOpts: createBabylonOptions({
    sourceType: "module",
    plugins: [ "dynamicImport" ]
  })
}

pluginTester({
  plugin: thisPlugin,
  babelOptions,
  snapshot: true,
  tests: {
    "Adds chunkname when missing": "import('./HelloView')",
    "Adds chunkname when missing for subfolder import": "import('./sub/HelloView')",
    "Supports multi targets": "import(`./views/${name}`)",
    "Simplifies deep multi targets": "import(`../other/views/${name}`)",
    "Simplifies deep multi targets with extension":
      "import(`../other/views/${name}.css`)",
    "Simplifies deep multi targets with prefix":
      "import(`../other/views/prefix-${name}.css`)",
    "Keeps chunkName simple even for longer paths":
      "import('./views/admin/SettingsView')",
    "Keeps existing comments": "import(/* keep me */ './HelloView')",
    "Adds chunkName to existing magic comment":
      "import(/* webpackPrefetch: true */ './HelloView')",
    "Don't overwrites manual chunkName":
      "import(/* webpackChunkName: 'CustomHello' */ './HelloView')",
    "Adds chunkname when missing inside loadable()": "loadable((props) => import('./HelloView'))"
  }
})
