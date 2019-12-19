import React, { Component } from 'react'
import { Form, Row, Col, Button, Icon } from 'antd'
import AntFromItem from '@components/ant/FromItem'

import { SelectDictionaryType1, SelectAdminList, SelectDictionary } from '@/services/api'
import { getStorage } from '@utils/storage'

import styles from './index.module.less'


class TableFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      FromItemArr: this.props.FromConfig,
      isBtnGroupUp: false
    }
  }

  componentDidMount () {
    this.getSelectOptions();
  }

  getSelectOptions = () =>  {
    let data = { token: getStorage('userInfo').token };
    let apiArr = [SelectDictionaryType1(data), SelectAdminList(data), SelectDictionary(data)];
    
    Promise.all(apiArr).then(res => {
      const communicationTypeArr = res[0].data[0].children;
      const adminIdArr = res[1].data;
      const dictionaryArr = res[2].data[0].children;

      this.communicationTypeArr = communicationTypeArr
      this.adminIdArr = adminIdArr

      let rankSelect = [];
      let urgencySelect = [];

      dictionaryArr.map(item => {
        if (item.label === "密级" || item.rank === 'rank') {
          rankSelect = item.children
        } else if (item.label === "紧急程度" || item.rank === 'urgency') {
          urgencySelect = item.children
        }
        return item
      });

      const FromItemArr = this.state.FromItemArr.map(item => {
        let name = item.name;
        switch (name) {
          case 'communicationTypeArr':
            item.options = communicationTypeArr;
            break;
          case 'adminId':
            const options = adminIdArr.map(item => {
              item.value = item.adminId
              item.text = item.adminName
              return item
            })
            item.options = options;
            item.loading = false;
            break;
          case 'rank':
            item.options = rankSelect;
            item.loading = false;
            break;
          case 'urgency':
            item.options = urgencySelect;
            item.loading = false;
            break;
          default:
            break;
        }
        return item
      })
      
      this.setState({
        FromItemArr: FromItemArr
      })

      return FromItemArr

    }).catch(error => { });
  }

  toggleForm = (isOpen) => {
    this.setState({
      isBtnGroupUp: !this.state.isBtnGroupUp
    })
  }


  // 搜索
  handleSearch = (e) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      this.props.handleSearch(fieldsValue);
    })
  }

  // 重置
  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
    this.props.handleSearch()
  }


  render () {
    const { getFieldDecorator } = this.props.form;
    const FromItemArr = [...this.state.FromItemArr];
    if (!this.state.isBtnGroupUp) {
      FromItemArr.length = 3
    }
    return (
      <Form onSubmit={this.handleSearch} layout='inline' className={styles.tableListForm}>
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          {
            FromItemArr.map((item, index) => {
              let params = {...item, getFieldDecorator}
              return (
                <Col md={6} sm={24} key={index}>
                  <AntFromItem {...params} />
                </Col>
              )
            })
          }
          <Col md={6} sm={24} 
               className={`text-align-right ${this.state.isBtnGroupUp ? 'btnGroupDown' : 'btnGroupUp'}`}>
            <span className={styles.submitButtons}>
              <Button type='primary' htmlType='submit'>
                  查询
              </Button>
              <Button className='marginLeft8' onClick={this.handleFormReset}>
                  重置
              </Button>
              <span className={'link-button marginLeft8'} onClick={this.toggleForm}>
                  { 
                    this.state.isBtnGroupUp 
                    ? <span>收起 <Icon type='up'/></span> 
                    : <span>展开 <Icon type='down'/></span> 
                  }
              </span>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }
}


export default Form.create()(TableFrom)