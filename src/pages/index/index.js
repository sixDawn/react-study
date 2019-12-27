import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import store from "@/redux/store";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import '@css/index.less';

moment.locale('zh-cn');

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'));

