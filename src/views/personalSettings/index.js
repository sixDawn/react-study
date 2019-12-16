import React from 'react';
import { Layout, Breadcrumb, Button, 
         Upload, Icon, message, Form, Input } from 'antd';
import RenderInfo from '@components/renderInfo'

import { UpdateAdmin } from '@/services/api.js'
import avatarImg from '@/assets/images/default.jpg';

const { Content } = Layout;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}


class personalSettings extends React.Component {
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <div className="panelWrap">
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
          <Form.Item label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="用户名">
            {getFieldDecorator('adminName', {
              rules: [{ required: true, message: '用户名不能为空' }],
              initialValue: data.adminName
            })(<Input placeholder="用户名" />)}
          </Form.Item>
          <Form.Item label="角色">
            {data.role.name}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
  
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

        UpdateAdmin(data).then(res => {
          message.success('修改成功');
          userInfo.adminName = data.adminName;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }).catch(res => {
        });

      }
    });
  };


  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  }

  render() {
    return (
      <Content style={{ margin: '0 16px' }}>

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
          <Breadcrumb.Item>个人主页</Breadcrumb.Item>
        </Breadcrumb>

        <RenderInfo dataInfo={this.state.userInfo} dataPanel={this.dataPanel()} />

      </Content>
    );
  }

}

const personalSetting = Form.create()(personalSettings);

export default personalSetting;

