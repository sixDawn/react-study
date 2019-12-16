import React from 'react';
import { Layout, Breadcrumb, Pagination } from 'antd';

import TableList from '@components/ant/TableList'
import TableFrom from '@components/ant/TableFrom'

import { FromConfig } from './fromConfig'
import { TableConfig } from './tableConfig'

import { SelectDocument } from '@/services/api'

const { Content } = Layout; 

class pageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formValues: {
        adminId: '',
        communicationType: [],
        endDate: '',
        fromNumber: '',
        myNumber: '',
        p: 1,
        pageSize: 1,
        print: 0,
        rank: '',
        startDate: '',
        title: '',
        unit: '',
        urgency: '',
        word: '',
        year: ''
      },
      list: [],
      loading: true,
      pagination: {
        position: 'bottom',
        defaultCurrent: 1,
        total: 0,
        current: 1,
        pageSize: 10,
        showTotal: (total)=>{
          return `共 ${total} 条`;
        },
        showQuickJumper: true,
        showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => {
          console.log(current, pageSize);
        },
        onChange: (pageNumber) => {
          this.setState({
            pagination: {
              ...this.state.pagination,
              current: pageNumber
            }
          })
          this.state.formValues.p = pageNumber;
          this.getTabelList(this.state.formValues)
          
          // this.getTabelList(this.state.formValues)
        }
      }
    }
  }
    
  componentDidMount() {
    this.getTabelList(this.state.formValues)
  }

  getTabelList = (data) => {
    this.setState({
      loading: true
    });
    this.state.formValues = {
      ...data
    };
    SelectDocument(data).then(res => {
      this.setState({
        list: res.data,
        loading: false,
        pagination: {
          ...this.state.pagination, 
          total: res.count
        }
      })
    }).catch(res => {
    });
  }

  render() {
    const fromConfig = {
      FromConfig: FromConfig,
      handleSearch: (data) => {
        if (!data) {
          this.setState({
            pagination: {
              ...this.state.pagination,
              current: 1
            }
          })
        }
        this.getTabelList(data)
      }
    }
    const tableConfig = {
      list: this.state.list,
      loading: this.state.loading,
      TableConfig: TableConfig,
      pagination: this.state.pagination 
    }
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>来文管理</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360, position: 'relative'}}>
          <TableFrom {...fromConfig}/>
          <TableList {...tableConfig}/>
        </div>

      </Content>
    );
  }
}

export default pageList;

