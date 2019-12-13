This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

 git config --global user.email "you@example.com"
 git config --global user.name "Your Name"


## react-app-rewired
    安装 react-app-rewired

    npm install react-app-rewired@1.6.2 --save-dev
    注意！！ react-app-rewired2.x以后，不再支持injectBabelPlugin的方式，需要安装customize-cra 
    customize-cra地址
    https://npm.taobao.org/package/customize-cra 
    在根目录新建 config-overrides.js 文件 【对webpack配置进行覆盖】

    修改package.json文件
        "scripts": {
        -    "start": "react-scripts start",
        +    "start": "react-app-rewired start",
        -    "build": "react-scripts build",
        +    "build": "react-app-rewired build",
        -    "test": "react-scripts test",
        +    "test": react-app-rewired test",
        -    "eject": "react-scripts eject"
        },

        yarn add react-app-rewired --dev
        yarn add customize-cra -S

    1.x版本使用方法
        a. 使用less [未测试]

        npm install react-app-rewire-less --save-dev
        npm install babel-plugin-import --save-dev

        const { injectBabelPlugin } = require('react-app-rewired');
        const rewireLess = require('react-app-rewire-less');
        module.exports = function override(config, env) {

            config = rewireLess.withLoaderOptions({
                modifyVars: { "@primary-color": "#9F35FF" },
            })(config, env);

            return config;
        }



    2.x版本 
        a. 使用less  [测试有效]
        + const { override, addLessLoader } = require('customize-cra');

        module.exports = override({
            + addLessLoader({
            +   javascriptEnabled: true,
            +   modifyVars: { '@primary-color': '#1DA57A' },
            + }),
        })

        b.使用 ant-ui的 按需加载
            安装 babel-plugin-import
            yarn add babel-plugin-import --dev

            + const { override, fixBabelImports } = require('customize-cra');

            + module.exports = override(
            +   fixBabelImports('import', {
            +     libraryName: 'antd',
            +     libraryDirectory: 'es',
            +     style: 'css',  // style: true 与less搭配时使用
            +   }),
            + );

        c. 关掉EsLint验证
            + const { override, disableEsLint } = require('customize-cra');

            + module.exports = override(
            +   disableEsLint()
            + );

        d. 配置别名
            + const { override, addWebpackAlias } = require('customize-cra');
            + const path = require('path');

            + module.exports = override(
            +   addWebpackAlias({
            +       '@': path.resolve(__dirname, 'src'),
            +       '@page': path.resolve(__dirname, 'src/page'),
            +   })
            + );


## 配置多入口 react-app-rewired内使用插件版[只使用此出一种，网上很多种方法试用失败]
## multipleEntry 
    插件npm地址：https://www.npmjs.com/package/react-app-rewire-multiple-entry
    
    安装
    npm install react-app-rewire-multiple-entry --save-dev
    yarn add react-app-rewire-multiple-entry --dev

    1.x版本 react-app-rewired
    
    // config-overrides.js

        const multipleEntry = require('react-app-rewire-multiple-entry')([
            {
                entry: 'src/entry/landing.js',
                template: 'public/landing.html',
                outPath: '/landing.html'
            }
        ]);
        
        module.exports = {
            webpack: function(config, env) {
                multipleEntry.addMultiEntry(config);
                return config;
            }
        };

    2.x版本 react-app-rewired  使用customize-cra
    
    // config-overrides.js

        const multipleEntry = require('react-app-rewire-multiple-entry')([
            {
                entry: 'src/entry/landing.js',
                template: 'public/landing.html',
                outPath: '/landing.html'
            }
        ]);
        
        const {
            // addBundleVisualizer,
            override,
            overrideDevServer 
        } = require('customize-cra');
        
        module.exports = {
            webpack: override(
                multipleEntry.addMultiEntry
                // addBundleVisualizer()
            )
        };




## react-router-dom 路由

    BrowserRouter  HashRouter  withRouter

    1.
    <Route component={Dome} />
    <Route render={() => (<Dome idx={this.state.idx}/>)}/>
    两种方式功能一致，都是引入路由的路径。下面render()的方式性能更优。
    component：是引入路由的路径
    相关的文档: https://www.jianshu.com/p/a2a9b469a422

    2.
    Redirect // 当用户访问某界面时，该界面并不存在，此时用Redirect重定向，重新跳到一个我们自定义的组件里。
    <Redirect to="/app/" />
    <Route render={() => (<Redirect to='/app/error'></Redirect>)}/>
    Redirect  一般放到<Switch>里面


    3.
    exact的作用：exact能够使得路由的匹配更严格一些。
    exact的值为bool型，为true是表示严格匹配，为false时为正常匹配。
　　 如在exact为true时，’/link’与’/’是不匹配的，但是在false的情况下它们又是匹配的。

    <Route exact>

    <Route path='/' component={Home} />
    <Route path='/page' component={Page}>
    //这种情况下，如果匹配路由path='/page'，那么会把Home也会展示出来。

    <Route exact path='/' component={Home} />
    <Route path='/page' component={Page} />

    4.
    history  // forceRefresh为真时强制刷新页面
    <Route history={} />

    import { createBrowserHistory } from 'history'
    const history = createBrowserHistory({forceRefresh:true}); 


## mobx 状态管理工具  管理全局数据流

## mobx的坑
    需要 对@装饰器的支持

    方法一: [有效]
        安装依赖:
        yarn add @babel/plugin-proposal-decorators
        yarn add babel-plugin-transform-decorators-legacy

        修改文件:  [ package.json ]
        { 
            "babel": {
                "presets": [ "react-app"  ],
                "plugins": [
                    ["@babel/plugin-proposal-decorators",  { "legacy": true  }   ],   // 增加配置
                    [ "@babel/plugin-proposal-class-properties", {  "loose": true  } ]  // 增加配置
                ]
            }
        }
        
        文件添加: [  ]
        addBabelPlugin(
            ["@babel/plugin-proposal-decorators", { "legacy": true }]
        ),
    方法二: [其他网上方法貌似无效, ...]



## axios 数据请求

## redux
    https://blog.csdn.net/qq_18242391/article/details/88883752


    import { createStore } from "redux";
    function counter(state = 0, action) {
        switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
        }
    }
    // 创建 Redux store 来存放应用的状态。
    // Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
    // API 是 { subscribe, dispatch, getState }。
    const store = createStore(counter);
    // Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。
    const state = store.getState();


## react-redux
    说明博客: [阮一峰] http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
    
    import { Provider } from 'react-redux';
    用来全局绑定store
    用Provider包裹最外出的组件，这样就可以吧store绑定到全局，这样内部的所有组件就可以接受到store的值
    <Provider store={store}>
        <App />
    </Provider>


    import { connect } from 'react-redux';
    使用connect来建立联系，将组件App与redux建立联系
    mapStateToProps方法_处理数据
    mapDispatchToProps方法_派遣事件

    // 事件派发，自动调用reducer，通过reducer保存到store对象中
    const { dispatch } = this.props;
    dispatch();

    function mapStateToProps(state) {
        const { count } = state
        console.log("count", count)
        return {
            num: count.num
        }
    }
    function mapDispatchToProps(dispatch) {
        return {
            add: () => dispatch({
                type: "ADD"
            })
        }
    }

    connect默认会把绑定的数据和执行动作的方法传递到 component 内不的props里 
    this.props.state // 数据状态
    this.props.dispatch // 动作方法

    ####
    【mapStateToProps】 
        负责输入逻辑，即将state映射到 UI 组件的参数 (props) 中，
        它会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
        它的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
        使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。

        个人解读: 就是把全局的state内的数据拿出来，绑定到Component内的porps上。
                 且只有绑定过的数据才能在全局数据变化后进行实时数据的更新，来同步重新渲染dome。
                 mapStateToProps可以不传，如果不传，组件不会监听store的变化，也就是说Store的更新不会引起UI的更新 

        eg:  const mapStateToProps = (state) => ({ userInfo: state.userInfo })
             就可以在 Component 内通过 
                const { userInfo } = this.props; 、
             来拿到数据

    ####
    【mapDispatchToProps】 
        负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
        connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。



    export default connect(mapStateToProps, mapDispatchToProps)(App);



## proxy跨域配置
    
    单个域名跨域配置
    在package.json添加
    + "proxy": "需要配置跨域的域名",




