import React, {Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  
  render() {
    return (
      <Sider
        collapsible 
        collapsed={this.state.collapsed} 
        onCollapse={this.onCollapse}
        style={{
          overflow: 'auto'
        }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="setting" />
                <span>系统管理</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <Link to="/systemManage/pageList">来文管理</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/systemManage/dictionaryList">字典管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}


export default SiderMenu;

/* <SubMenu
  key="sub1"
  title={
    <span>
      <Icon type="setting" />
      <span>首页</span>
    </span>
  }
>
  <Menu.Item key="3">
    <Link to="/home/pageList">来文管理</Link>
  </Menu.Item>
  <Menu.Item key="4">
    <Link to="/home/dictionaryList">字典管理</Link>
  </Menu.Item>
</SubMenu> */
