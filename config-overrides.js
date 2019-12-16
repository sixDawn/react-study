process.env.REACT_APP_URL = 
    process.env.NODE_ENV === 'development' 
    ? '' 
    : "http://10.0.7.178:8080/index.php";

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer
} = require('customize-cra');


const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


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


const multipleEntry = require('react-app-rewire-multiple-entry')(getEntries());

const addEntry = () => config => {
  multipleEntry.addMultiEntry(config);
  return config;
};

const addEntryProxy = () => (configFunction) => {
  // multipleEntry没有addEntryProxy这个方法 坑爹的博客或者 坑爹的版本
  multipleEntry.addEntryProxy(configFunction);
  return configFunction;
}

module.exports = {
  /**
   * @ 可以实现单页面修改默认的.html模板
   * @ path.resolve(__dirname) 获取根目录的绝对路径
   * @ path.resolve(__dirname, "test.html")
   */
  paths: function (paths, env) {
    paths.appHtml = path.resolve(__dirname, "public/index.html");
    return paths;
  },
  webpack: override(
    /**
     * @ 添加自定义
    */
    addCustomize(),
    /**
     * @ Ant-UI 按需加载
    */
    fixBabelImports('import', { 
      libraryName: 'antd', 
      libraryDirectory: 'es',
      style: true 
    }),
    /**
     * @ less
    */
    addLessLoader({
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A' },
    }),
    /**
     * @ 配置别名
    */
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '@css': path.resolve(__dirname, 'src/assets/css'),
      '@page': path.resolve(__dirname, 'src/page'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@layer': path.resolve(__dirname, 'src/assets/plugins/layer'),
    }),
    /**
     * @ 添加多页配置
     */
    addEntry()
  ),
  devServer: overrideDevServer(
    // addEntryProxy()
  ),
}

function getEntries () {
  let files = fs.readdirSync('src/pages/');
  let entries = files.map(filename => {
    return {
      entry: `src/pages/${filename}/index.js`,
      template: 'public/index.html',
      outPath: `/${filename}.html`
    }
  })
  return entries
}
