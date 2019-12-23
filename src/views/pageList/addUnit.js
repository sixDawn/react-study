import React from 'react';
import { Modal, Form, Button } from 'antd'
import AntFromItem from '@components/ant/FromItem'
import styles from "./style.module.less";

class addUnit extends React.Component {

  componentDidMount() {

  }

  // 保存
  saveForm = (e) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      // this.props.handleSearch(fieldsValue);
    })
  }


  render() {
    const { visible, title, handleOk, handleCancel, width, AddUnitFromConfig } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <Modal
            visible={visible}
            title={title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back">
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={this.saveForm}>
                保存
              </Button>,
            ]}
            width={width}
          >
          <Form {...formItemLayout} onSubmit={this.saveForm} layout='inline'  className={styles.formWrap}>
            {
              AddUnitFromConfig.map((item, index) => {
                let params = {...item, getFieldDecorator}
                return (
                  <AntFromItem key={index} {...params} />
                )
              })
            }
          </Form>
      </Modal>
    );
  }
}


export default Form.create()(addUnit)
