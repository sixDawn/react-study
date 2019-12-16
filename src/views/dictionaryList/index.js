import React from 'react';
import { Layout, Breadcrumb, Button} from 'antd';
import AntdEmpty from '@components/ant/Empty/Empty'

const { Content } = Layout;

class pageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    }
  }

  emptyState = {
    description: '真的没有数据',
  }

  handleClick = () => {
    console.log('重新加载')
  }

  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>字典管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24, background: '#fff', minHeight: 360, position: 'relative' }}>
          {this.renderDataInfo()}
        </div>
      </Content>
    );
  }

  renderDataInfo = () => {
    if(this.state.dataList) {
      return (
        <AntdEmpty {...this.emptyState}>
          <div>
            <Button type="primary" onClick={this.handleClick}>按钮</Button>
          </div>
        </AntdEmpty>
      )
    } else {
      return (
        <div>内容列表</div>
      )
    }
  }

}

export default pageList;

