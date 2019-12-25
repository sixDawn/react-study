import React from 'react';
import { Modal, Form, Button } from 'antd';
import AntFromItem from '@components/ant/FromItem';
import styles from "./style.module.less";
import { getAddUnitFromConfig } from './fromConfig'
import { FindLastNum, AddDocument } from '@/services/api'


class addUnit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AddUnitFromConfig: getAddUnitFromConfig(this),
      selectOptions: this.props.selectOptions
    }
  }

  componentDidMount() {
    this.setSelectOptions();
  }

  // 设置下拉框的选项
  setSelectOptions = async () => {
    const selectOptions = this.state.selectOptions;
    console.log('child',selectOptions)
    const addUnitItem = this.setAddUnitItem_select(selectOptions);

    this.setState({
      AddUnitFromConfig: addUnitItem
    })
  }
  setAddUnitItem_select = (selectOptions) => {
    let addUnitItem = this.state.AddUnitFromConfig;

    selectOptions.year = selectOptions.communicationTypeArr;
    addUnitItem.map((item) => {
      const name = item.name;
      if (selectOptions[name]) {
        item.options = selectOptions[name];
        item.loading = false;
      }
      return item
    })
    return addUnitItem;
  }
  setCommunicationType = (year, option) => {
    const addUnitItem = this.state.AddUnitFromConfig;

    addUnitItem.map((item) => {
        if (item.name === "communicationType" && option) {
          item.options = option.props.item.children || [];
          item.loading = false;
        }
        return item;
    });

    this.setState({
        AddUnitFromConfig: addUnitItem
    });
  }
  setNum = (val, option) => {
    const { token, AddUnitFromConfig } = this.state;

    FindLastNum({
      token: token,
      communicationType: val
    }).then(res => {
      AddUnitFromConfig.map((item) => {
        if (item.name === "num") {
          item.defaultValue = res.num
        }
        return item;
      });
      
      this.setState({
        AddUnitFromConfig: AddUnitFromConfig
      });
    })
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
     
      AddDocument(postData).then(res => {
        console.log(res)
      })
     
    })
  }

  render() {
    const { visible, title, handleOk, handleCancel, width } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { AddUnitFromConfig } = this.state

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
            forceRender={true}
            destroyOnClose={true}
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


export default Form.create({
  onFieldsChange(props, changedFields) {
    const { form, token } = props;

    if(changedFields.hasOwnProperty('year')) {
      form.setFieldsValue({
        communicationType: undefined
      })
    }

    if (changedFields.hasOwnProperty('communicationType')) {
      const val = changedFields.communicationType.value;
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

  },
})(addUnit)
