import React, { Component } from 'react'
import { Form, Row, Col, Button, Icon } from 'antd'
import AntFromItem from '@components/ant/FromItem'

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
  handleFormReset = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.resetFields();
    
    let vals = form.getFieldsValue();
    this.props.handleFormReset(vals);
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const { isBtnGroupUp } = this.state;
    const FromItemArr = [...this.state.FromItemArr];
    
    return (
      <Form onSubmit={this.handleSearch} layout='inline' className={styles.tableListForm}>
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}
          className={`${isBtnGroupUp ? 'fromWrapOpen' : 'fromWrapRetract'}`}>
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
               className={`text-align-right btnGroup`}>
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
