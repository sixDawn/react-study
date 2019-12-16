import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Avatar, Dropdown, Icon, Menu, Spin, Modal } from 'antd';
import styles from './style.module.less';
import avatarImg from '@/assets/images/default.jpg';

/* import { removeStorage } from '@utils/storage'; */
import { setUserInfo } from "@/redux/actions/userInfo";


const { Header } = Layout;
const confirm = Modal.confirm

class GlobalHeader extends Component {

  componentDidMount () {
    // console.log(this.props)
  }

  handleMenuClick = (e) => {
    const { history } = this.props;
    const key = e.key;
    switch (key) {
      case 'userCenter':
        history.push('/personalCenter/personalSettings')
        break;
      case 'userSettings' :
        history.push('/personalCenter/changpwd')
        break;
      case 'logout' :
        history.push('/account/settings');
        confirm({
          title: '确认要退出登录吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            const {setUserInfo} = this.props;
            setUserInfo('')
          },
          onCancel: () => {}
        });
        break;
      default:
        break;
    }
  }

  render() {
    const currentUser = this.props.userInfo;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]}  onClick={this.handleMenuClick}>
        <Menu.Item key='userCenter'>
          <Icon type='user'/>个人主页
        </Menu.Item>
        <Menu.Item key='userSettings'>
          <Icon type='setting'/>修改密码
        </Menu.Item>
        <Menu.Item key='logout'>
          <Icon type='logout'/>注销
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className={styles.header} >
        <div className={styles.right}>
          {
            currentUser ? (
              <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar
                    size='small'
                    className={styles.avatar}
                    src={currentUser.avatar || avatarImg}/>
                  <span className={styles.name}>{currentUser.adminName}</span>
                </span>
              </Dropdown>
            ) : (
              <Spin size='small' style={{ marginLeft: 8 }}/>
            )
          }
        </div>
      </Header>
    )
  }
}


const mapStateToProps = (state) => ({ userInfo: state.userInfo})

export default connect(mapStateToProps, { setUserInfo })(GlobalHeader) 
