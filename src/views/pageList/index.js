import React from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb } from 'antd';
import TableList from '@components/ant/TableList'
import TableFrom from '@components/ant/TableFrom'
import { FromConfig } from './fromConfig'
import { TableConfig } from './tableConfig'
import { SelectDocument, SelectDictionaryType1, SelectAdminList, SelectDictionary } from '@/services/api'

import { objIsEmpty } from '@utils'

const { Content } = Layout; 

class pageList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: this.props.userInfo.token,
      formValues: {
        token: this.props.userInfo.token,
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
        /* showSizeChanger: true,
        onShowSizeChange: (current, pageSize) => {
          this.setState({
            pagination: {
              ...this.state.pagination,
              current: current,
              pageSize: pageSize
            },
            formValues: {
              ...this.state.formValues,
              p: current,
              pageSize: pageSize
            }
          });
          this.getTabelList(this.state.formValues);
        }, */
        onChange: (pageNumber) => {
          this.setState({
            pagination: {
              ...this.state.pagination,
              current: pageNumber
            },
            formValues: {
              ...this.state.formValues,
              p: pageNumber
            }
          }, () => {
            this.getTabelList(this.state.formValues);
          });
        }
      },
      FromConfig: FromConfig
    }
  }
    
  componentDidMount() {
    this.getTabelList(this.state.formValues);
    this.getSelectOptions();
  }

  // 获取列表数据
  getTabelList = () => {
    this.setState({
      loading: true
    });
    let data = this.state.formValues;
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

  // 获取下拉框的选项
  getSelectOptions = () =>  {
    let data = { token: this.state.token };
    let apiArr = [SelectDictionaryType1(data), SelectAdminList(data), SelectDictionary(data)];
    
    Promise.all(apiArr).then(res => {
      const communicationTypeArr = res[0].data[0].children;
      const adminIdArr = res[1].data;
      const dictionaryArr = res[2].data[0].children;

      this.communicationTypeArr = communicationTypeArr
      this.adminIdArr = adminIdArr

      let rankSelect = [];
      let urgencySelect = [];

      // 下拉选项
      dictionaryArr.map(item => {
        if (item.label === "密级" || item.rank === 'rank') {
          rankSelect = item.children;
        } else if (item.label === "紧急程度" || item.rank === 'urgency') {
          urgencySelect = item.children;
        }
        return item
      });

      rankSelect.map(item => {
        item.val = item.id;
        return item
      })

      const FromItemArr = this.state.FromConfig.map(item => {
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
        FromConfig: FromItemArr
      })

      return FromConfig

    }).catch(error => { });
  }

  // 表单
  setTableFrom = () => {
    const fromConfig = {
      FromConfig: this.state.FromConfig,
      // 查询
      handleSearch: (vals) => {
        let FromInfo = this.state.FromConfig;
        let data = {
          ...this.state.formValues,
          ...vals,
          p: 1,
          startDate: vals.startDate && vals.startDate.format('YYYY-MM-DD'),
          endDate: vals.endDate && vals.endDate.format('YYYY-MM-DD'),
          communicationType: vals.communicationTypeArr && vals.communicationTypeArr[vals.communicationTypeArr.length-1]
        }
        FromInfo.map(item => {
          Object.keys(data).forEach(key => {
            if(item.name === key) {
              item.defaultValue = data[key]
            }
          })
          return item
        })
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: 1
          },
          FromConfig: FromInfo,
          formValues: {
            ...this.state.formValues,
            data
          }
        })

        this.getTabelList();
        
      },
      // 重置
      handleFormReset: () => {
        let FromInfo = this.state.FromConfig;
        FromInfo.map(item => {
          item.defaultValue = null;
          return item
        });
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: 1
          },
          FromConfig: FromInfo
        });
        this.getTabelList();
      }
    }

    return (
      <TableFrom {...fromConfig}/>  
    )
  }

  // 数据列表
  setTableList = () => {
    const tableConfig = {
      list: this.state.list,
      loading: this.state.loading,
      TableConfig: TableConfig,
      pagination: this.state.pagination,
      onChange: (pagination, filters, sorter, extra) => {
        if (!objIsEmpty(sorter)) {
          const orderBy = sorter.order ? `${sorter.field} ${sorter.order === 'ascend' ? 'asc' : 'desc' }` : '';
          this.setState({
            formValues: {
              ...this.state.formValues,
              orderBy: orderBy
            }
          }, () => {
            this.getTabelList()
          })
        }
        
      }
    }

    return (
      <TableList {...tableConfig}/>
    )
  }

  render() {
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>来文管理</Breadcrumb.Item>
        </Breadcrumb>

        <div className="tabel-base-wrap" style={{ padding: 24, background: '#fff', minHeight: 360, position: 'relative'}}>
          {this.setTableFrom()}
          {this.setTableList()}
        </div>
      </Content>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    dictionary: state.dictionary
  }
}

export default connect(mapStateToProps)(pageList);
