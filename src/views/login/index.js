import React from 'react';
import { Form, Button, message } from 'antd';
import { connect } from 'react-redux'
import BaseFromItem from '@components/baseFromItem/baseFromItem.js';
import './style.less';

import { LOGIN } from '@/services/api.js';
import { setUserInfo } from "@/redux/actions/userInfo";

class LoginForm extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      loginLoading: false
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loginLoading: true
        })
        values.token = '';
        
        LOGIN(values).then(res => {
          this.setState({
            loginLoading: false
          })
          if (res.data.token) {
            const { setUserInfo } = this.props;
            setUserInfo(res.data);
            // this.props.history.push({ pathname: '/' });
          } else {
            message.error('用户名或密码错误');
          }
        }).catch(error => {
          this.setState({
            loginLoading: false
          })
        })
      }
    });
  }

  componentDidMount() {
    // console.log(this.props)
  }

  componentWillUnmount() {
    
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const loginFormConfig = [
      { 
        name: 'account', 
        rules: [{ required: true, message: '请输入用户名' }],
        Input: {
          placeholder: '请输入用户名',
          type: null,
          IconType: 'user',
          styles: { color: 'rgba(0,0,0,.25)' },
          size: 'large'
        }
      },
      { 
        name: 'pwd', 
        rules: [{ required: true, message: '请输入密码' }],
        type: 'Password',
        Input: {
          placeholder: '请填写密码',
          type: 'password',
          IconType: 'lock',
          styles: { color: 'rgba(0,0,0,.25)' },
          size: 'large'
        }
      }
    ];

    return (
      <div className="App">
        <div className="tit">市府办保密室文档管理软件</div>
        <div className="loginWrap">
          <div className="tit">
            系统登录
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <BaseFromItem formConfig={loginFormConfig} getFieldDecorator={getFieldDecorator}></BaseFromItem>
            <Form.Item>
              <Button
                block
                type="primary"
                size="large"
                htmlType="submit"
                loading={this.state.loginLoading}
                className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);


const mapStateToProps = (state) => ({ userInfo: state.userInfo })
// const mapDispatchToProps = (dispatch) => ({ setUserInfo: (data) => dispatch(setUserInfo(data)) })

export default connect(mapStateToProps, { setUserInfo })(Login)
