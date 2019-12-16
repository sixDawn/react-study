import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import store from "@/redux/store"

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider  locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'));

