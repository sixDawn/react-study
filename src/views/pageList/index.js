import React from 'react';
import { Layout, Breadcrumb } from 'antd';

import AntdEmpty from '@components/ant/Empty/Empty'
import TableList from '@components/ant/TableList'

import { SelectDocument } from '@/services/api'

const { Content } = Layout; 

class pageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
    
  componentDidMount() {
    let data = {
      adminId: '',
      communicationType: [],
      endDate: '',
      fromNumber: '',
      myNumber: '',
      p: 1,
      pageSize: 10,
      print: 0,
      rank: '',
      startDate: '',
      title: '',
      unit: '',
      urgency: '',
      word: '',
      year: ''
    }

    SelectDocument(data).then(res => {
      this.setState({
        list: res.data
      })
    }).catch(res => {
    });

  }

  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>来文管理</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', minHeight: 360, position: 'relative'}}>
         {
           this.state.list.length > 0 
           ? <TableList list={this.state.list} />
           : <AntdEmpty />
         }
       </div>

      </Content>
    );
  }
}

export default pageList;

