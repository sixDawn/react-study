import React from 'react';
import { Modal, Form, Button } from 'antd';
import AntFromItem from '@components/ant/FromItem';
import styles from "./style.module.less";
import { getAddUnitFromConfig, getSelectOptions } from './fromConfig'
import { FindLastNum, AddDocument } from '@/services/api'

import AntModal from "@components/ant/Modal";


class addUnit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      title: props.title,
      width: props.width || 600,
      visible: false,
      loading: false,
      fromConfig: getAddUnitFromConfig(this),
    }
  }

  async componentDidMount () {
    await this.setSelectOptions();
  }

  /**
   * 设置表单的select的下拉选项
   * @onChange_year  select_切换来文年
   * @onChange_communicationType select_切换文件类型
   */
  setSelectOptions = async () => {
    const selectOptions = await getSelectOptions();
    const fromConfig = this.getItem_select(selectOptions);

    this.setState({
      fromConfig: fromConfig
    })
  }
  getItem_select = (selectOptions) => {
    let fromConfig = this.state.fromConfig;

    selectOptions.year = selectOptions.communicationTypeArr;
    fromConfig.map((item) => {
      const name = item.name;
      if (selectOptions[name]) {
        item.options = selectOptions[name];
        item.loading = false;
      }
      return item
    })
    return fromConfig;
  }
  onChange_year = (year, option) => {
    const { form } = this.props;
  
    form.setFieldsValue({
      communicationType: undefined
    })


    const fromConfig = this.state.fromConfig;

    fromConfig.map((item) => {
        if (item.name === "communicationType" && option) {
          item.options = option.props.item.children || [];
          item.loading = false;
        }
        return item;
    });

    this.setState({
      fromConfig: fromConfig
    });
  }
  onChange_communicationType = (val, option) => {
    const { token } = this.state;
    const { form } = this.props;

    if (val) {
      FindLastNum({
        token: token,
        communicationType: val
      }).then(res => {
        form.setFieldsValue({
          num: res.num
        })
      })
    } else {
      form.setFieldsValue({
        num: ''
      })
    }
    
  }


  // 保存
  saveForm = (e) => {
    e.preventDefault()
    const { form } = this.props
    
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const postData = {
        ...fieldsValue,
        date: fieldsValue.date && fieldsValue.date.format('YYYY-MM-DD HH:mm:ss'),
        token: this.props.token
      }
      
      if(true) return

      AddDocument(postData).then(res => {
        console.log(res)
      })
     
    })
  }

  openMoal = () => {
    this.handleModalVisible(true);
  }

  handleOk = () => {
    this.handleModalVisible(false);
  }

  handleCancel = () => {
    this.handleModalVisible(false);
  }

  handleModalVisible = (flag) => {
    this.setState({
      visible: flag
    })
  }

  onRef = (ref) => {
    this.child = ref
  }

  clik = (e) => {
    this.child.openMoal()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title, width, visible, fromConfig, loading } = this.state

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
      <>
        <div className={'tableListOperator'}>
          <Button
            icon='plus'
            type='primary'
            onClick={this.clik}>
            新建来文
          </Button>
        </div>
        <Modal
            visible={visible}
            title={title}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={() => {this.handleModalVisible(false)}}>
                取消
              </Button>,
              <Button key="submit" type="primary" 
                      loading={loading}
                      onClick={this.saveForm}>
                保存
              </Button>,
            ]}
            width={width}
            forceRender={true}
            destroyOnClose={true}
          >
          <Form {...formItemLayout} onSubmit={this.saveForm} layout='inline'  className={styles.formWrap}>
            {
              fromConfig.map((item, index) => {
                let params = {...item, getFieldDecorator}
                return (
                  <AntFromItem key={index} {...params} />
                )
              })
            }
          </Form>
      </Modal>
      </>
    );
  }
}


export default Form.create({
  onFieldsChange(props, changedFields) {
  },
})(addUnit)
