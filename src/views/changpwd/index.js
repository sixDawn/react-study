import React from 'react';
import { Layout, Breadcrumb, Button, message, Form, Input, Avatar } from 'antd';
import RenderInfo from '@components/renderInfo'



import { ChangePwd } from '@/services/api.js'
import avatarImg from '@/assets/images/default.jpg';

const { Content } = Layout;


class changpwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
      loading: false,
      imageUrl: avatarImg
    }
  }

  dataPanel = () => {
    const data = this.state.userInfo;
    if (!data) {
      return
    }
    const { getFieldDecorator } = this.props.form;
    const { imageUrl } = this.state;
    return (
      <div className="panelWrap">
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Avatar src={imageUrl}  size={82}></Avatar>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            {getFieldDecorator('newPwd', {
              rules: [{ required: true, message: '新密码不能为空' }],
            })(<Input.Password placeholder="新密码" />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            {getFieldDecorator('newPwdRepeat', {
              rules: [
                { required: true, message: '重复新密码不能为空' },
                { validator: this.compareToFirstPassword }
              ],
            })(<Input.Password placeholder="重复新密码" />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
  
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newPwd')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let userInfo = this.state.userInfo;
        let data = {
          ...values,
          adminId: userInfo.adminId,
          token: userInfo.token,
        }

        ChangePwd(data).then(res => {
          message.success('修改成功');
        }).catch(res => {
        });

      }
    });
  };



  render() {
    return (
      <Content style={{ margin: '0 16px' }}>

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
          <Breadcrumb.Item>修改密码</Breadcrumb.Item>
        </Breadcrumb>

        <RenderInfo dataInfo={this.state.userInfo} dataPanel={this.dataPanel()} />

      </Content>
    );
  }

}

const changpwdx = Form.create()(changpwd);

export default changpwdx;

