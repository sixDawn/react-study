const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  disableEsLint,
  addBabelPlugin,
  // addDecoratorsLegacy
} = require('customize-cra');

const path = require('path');
const webpack = require('webpack');

const fs = require('fs');
const globby = require('globby');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


const addCustomize = () => (config, env) => {
  if (config.plugins) {
    // 将jq添加到全局
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    )

    // 暴露到全局的变量
    config.plugins.push(
      new webpack.DefinePlugin({
        BASE_URL:"'https://app.baidu.com/'",
        RREACT_APP_API: "'http://10.0.7.205:8080/hjzz.api/api/'" // JSON.stringify(process.env.RREACT_APP_API)
      })
    )
  }
  return config
};


// 关闭mapSource
const rewiredMap = () => config => {
  // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  // config.devtool = false;
  return config;
};

// 获取src下一级目录下的index
const entriesPath = globby.sync([resolveApp('src') + '/*/index.js'], {cwd: process.cwd()});
console.log(entriesPath)

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/index/index.js',
    template: 'public/index.html',
    outPath: '/index.html'
  },
  {
    entry: 'src/login/index.js',
    template: 'public/index.html',
    outPath: '/login.html'
  }
]);

module.exports = {
  webpack: override(
    addCustomize(),
    rewiredMap(),
    fixBabelImports('import', { 
      libraryName: 'antd', 
      libraryDirectory: 'es',
      style: true 
    }),
    addLessLoader({
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@page': path.resolve(__dirname, 'src/page'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@layer': path.resolve(__dirname, 'src/assets/plugins/layer'),
    }),
    disableEsLint(),
    /**
     * @ 装饰器支持
     */
    addBabelPlugin(
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ),
    multipleEntry.addMultiEntry
    // setEntries(),
    // addDecoratorsLegacy(), 
    // supportMultiPage()  
  ),
  /* devServer: configFunction => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      config.historyApiFallback.rewrites = [{ from: /^\/login\.html/, to: '/build/login.html' }];
      return config;
    }
  } */
}


