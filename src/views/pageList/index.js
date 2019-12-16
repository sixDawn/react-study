import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import AntdEmpty from '@components/ant/Empty/Empty'

const { Content } = Layout;

class pageList extends React.Component {

  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>来文管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360, position: 'relative'}}>
          <AntdEmpty></AntdEmpty>
        </div>
      </Content>
    );
  }
}

export default pageList;

