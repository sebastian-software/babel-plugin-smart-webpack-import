/* eslint-disable no-template-curly-in-string */
import createBabylonOptions from "babylon-options"
import pluginTester from "babel-plugin-tester"

import thisPlugin from "."

const babelOptions = {
  filename: "current/folder/currentFile.js",
  parserOpts: createBabylonOptions({
    sourceType: "module",
    plugins: [ "dynamicImport" ]
  })
}

pluginTester({
  plugin: thisPlugin,
  pluginName: "smart-webpack-import",
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
    "Simplifies deep multi targets with pre- and postfix":
      "import(`../other/views/prefix-${name}-postfix.css`)",
    "Keeps chunkName simple even for longer paths":
      "import('./views/admin/SettingsView')",
    "Keeps existing comments": "import(/* keep me */ './HelloView')",
    "Adds chunkName to existing magic comment":
      "import(/* webpackPrefetch: true */ './HelloView')",
    "Don't overwrites manual chunkName":
      "import(/* webpackChunkName: 'CustomHello' */ './HelloView')",
    "Adds chunkname when missing inside loadable()":
      "loadable((props) => import('./HelloView'))"
  }
})

pluginTester({
  plugin: thisPlugin,
  pluginName: "smart-webpack-import",
  pluginOptions: { hashes: false },
  babelOptions,
  snapshot: true,
  tests: {
    "Without hashes: Adds chunkname when missing": "import('./HelloView')",
    "Without hashes: Adds chunkname when missing for subfolder import":
      "import('./sub/HelloView')",
    "Without hashes: Supports multi targets": "import(`./views/${name}`)",
    "Without hashes: Simplifies deep multi targets": "import(`../other/views/${name}`)",
    "Without hashes: Simplifies deep multi targets with extension":
      "import(`../other/views/${name}.css`)",
    "Without hashes: Simplifies deep multi targets with prefix":
      "import(`../other/views/prefix-${name}.css`)",
    "Without hashes: Simplifies deep multi targets with pre- and postfix":
      "import(`../other/views/prefix-${name}-postfix.css`)",
    "Without hashes: Keeps chunkName simple even for longer paths":
      "import('./views/admin/SettingsView')",
    "Without hashes: Keeps existing comments": "import(/* keep me */ './HelloView')",
    "Without hashes: Adds chunkName to existing magic comment":
      "import(/* webpackPrefetch: true */ './HelloView')",
    "Without hashes: Don't overwrites manual chunkName":
      "import(/* webpackChunkName: 'CustomHello' */ './HelloView')",
    "Without hashes: Adds chunkname when missing inside loadable()":
      "loadable((props) => import('./HelloView'))"
  }
})
