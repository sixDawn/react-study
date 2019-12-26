import React from 'react';
import { Form, Button, message } from 'antd';
import AntFromItem from '@components/ant/FromItem';
import styles from "./style.module.less";
import { getAddUnitFromConfig, getSelectOptions } from './fromConfig'
import { FindLastNum, AddDocument, EditDocument, DocumentDel } from '@/services/api'

import AntModal from "@components/ant/Modal";


class addUnit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: props.token,
      title: props.title,
      width: 1000,
      visible: false,
      confirmLoading: false,
      fromConfig: getAddUnitFromConfig(this),
      formVal: {}
    }
  }

  async componentDidMount () {
    await this.setSelectOptions();
  }

  componentWillUnmount () {

  }

  componentDidUpdate() {
    this.props.onRef(this);
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
      selectOptions: selectOptions,
      fromConfig: fromConfig
    });
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
  getCommunicationTypeOptions = (year) => {
    let options = [];
    this.state.selectOptions.communicationTypeArr.map(item => {
      if (item.id === year) {
        options = item.children || []
      }
      return item
    })
    return options
  }

  // 保存
  saveForm = (e) => {
    e.preventDefault()
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return
      const postData = {
        ...this.state.formVal,
        ...fieldsValue,
        date: fieldsValue.date && fieldsValue.date.format('YYYY-MM-DD HH:mm:ss'),
        token: this.props.token
      }
    
      EditDocument(postData).then(res => {
        message.success('保存成功');
      }).catch(res => {
        message.error(res.msg);
      })

      if(true) return
      
      AddDocument(postData).then(res => {
        this.handleModalVisible(false);
        this.setState({ confirmLoading: true });
      }).catch(res => {
        this.setState({ confirmLoading: true });
      })
     
    });
  }
  edit = (vals) => {
    const fromConfig = this.state.fromConfig;

    fromConfig.map(item => {
      item.defaultValue = vals[item.name];
      if (item.name === 'communicationType') {
        item.options =  this.getCommunicationTypeOptions(vals['year'])
      }
      return item
    })

    this.setState({
      fromConfig: fromConfig,
      title: '编辑来文',
      formVal: vals
    })

    this.openMoal();
  }

  del = () => {
    DocumentDel({
      token: this.state.token,
      id: ''
    }).then(res => {
      console.log(res)
    }).catch(res => {
      console.log(res)
    })
  }

  /**
   * Modal组件作为子组件的方法
   * @onRef 绑定子组件
   * @openMoal 打开弹层
   * @handleModalVisible 弹出开关
   */
  onRef = (ref) => {
    this.child = ref
  }
  openMoal = () => {
    this.formRef.openMoal()
    // this.child.openMoal()
  }
  handleModalVisible = (flag) => {
    this.child.handleModalVisible(flag)
  }

  ox () {
    return (<AntModal></AntModal>)
  }
 
  render() {
    const { getFieldDecorator } = this.props.form;
    const { fromConfig, confirmLoading, width } = this.state

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

    const modal_params = {
      ...this.props,
      width: width,
      confirmLoading: confirmLoading,
      destroyOnClose: true,
      forceRender: true
    }
    
    
    return (
      <>
        <div className={'tableListOperator'}>
          <Button
            icon='plus'
            type='primary'
            onClick={this.ox}>
            新建来文
          </Button>
        </div>
        {/* <AntModal
            {...modal_params}
            onRef={this.onRef}
            wrappedComponentRef={(ref) => this.formRef = ref}
            handleOk={this.saveForm}
            okText={'保存'}>
            <Form 
              {...formItemLayout} 
              onSubmit={this.saveForm} 
              layout='inline' 
              className={styles.formWrap}>
              {
                fromConfig.map((item, index) => {
                  let params = {...item, getFieldDecorator}
                  return (
                    <AntFromItem key={index} {...params} />
                  )
                })
              }
            </Form>
        </AntModal> */}
      </>
    );
  }
}


export default Form.create({
  onFieldsChange(props, changedFields) {
  },
})(addUnit)
