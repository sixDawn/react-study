import React from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Dropdown, Button, Icon } from 'antd';
import TableList from '@components/ant/TableList'
import TableFrom from '@components/ant/TableFrom'
import AddUnit from './addUnit'
import { FromConfig, AddUnitFromConfig } from './fromConfig'
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
      FromConfig: FromConfig,
      visible_addUnit: false,
      loading_addUnit: false,
      AddUnitFromConfig: AddUnitFromConfig
    }
  }
  
  

  componentDidMount() {
    this.getTabelList(this.state.formValues);
    this.setSelectOptions();
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

  selectOptions = {
    /**
     * 拟办人
     * 文件类型
     * 密级
     * 紧急程度
     */
    adminId: [],
    communicationTypeArr: [],
    rank: [],
    urgency: []
  }


  copyIdToVal = (arr) => {
    arr.map(item => {
      item.val = item.id;
      return item
    })
    return arr
  }

  // 设置下拉框的选项
  setSelectOptions = () => {
    const data = {token: this.state.token}
    const apiArr = [SelectDictionaryType1(data), SelectAdminList(data), SelectDictionary(data)]

    Promise.all(apiArr).then(res => {
      const communicationTypeArr = res[0].data[0].children;
      const adminIdArr = res[1].data;
      const dictionaryArr = res[2].data[0].children;
  
      // 下拉选项
      dictionaryArr.map(item => {
        if (item.name === 'rank' || item.name === 'urgency') {
          this.selectOptions[item.name] = this.copyIdToVal(item.children);
        }
        return item
      });
  
      this.selectOptions = {
        ...this.selectOptions,
        adminId: adminIdArr.map(item => {
            item.value = item.adminId
            item.text = item.adminName
            return item
        }),
        communicationTypeArr: communicationTypeArr,
      }
      
      const FromItemArr = this.state.FromConfig.map(item => {
        const name = item.name;
        if (this.selectOptions[name]) {
            item.options = this.selectOptions[name];
            item.loading = false;
        }
        return item
      });
      
      const AddUnitFromItem = this.state.AddUnitFromConfig.map(item => {
        const name = item.name;
        if (this.selectOptions[name]) {
            item.options = this.selectOptions[name];
            item.loading = false;
        }
        return item
      });

      this.setState({
        FromConfig: FromItemArr,
        AddUnitFromConfig: AddUnitFromItem
      })
  
      return FromConfig
  
    }).catch(error => { });
  }


  setDefaultValue = (data) => {
    let FromInfo = this.state.FromConfig;
    FromInfo.map(item => {
      if (data) {
        Object.keys(data).forEach(key => {
          if(item.name === key) {
            item.defaultValue = data[key]
          }
        })
      } else {
        item.defaultValue = null;
      }
      return item
    });
    return FromInfo
  }
  // 表单
  setTableFrom = () => {
    const fromConfig = {
      FromConfig: this.state.FromConfig,
      // 查询
      handleSearch: (vals) => {
        const data = {
          ...this.state.formValues,
          ...vals,
          p: 1,
          startDate: vals.startDate && vals.startDate.format('YYYY-MM-DD'),
          endDate: vals.endDate && vals.endDate.format('YYYY-MM-DD'),
          communicationType: vals.communicationTypeArr && vals.communicationTypeArr[vals.communicationTypeArr.length-1]
        }
        
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: 1
          },
          FromConfig: this.setDefaultValue(data),
          formValues: {
            ...this.state.formValues,
            ...data
          }
        }, () =>{
          this.getTabelList();
        })
      },
      // 重置
      handleFormReset: (vals) => {
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: 1
          },
          FromConfig: this.setDefaultValue(),
          formValues: {
            ...vals
          }
        }, () => {
          this.getTabelList();
        });
        
      }
    }

    return (
      <TableFrom {...fromConfig}/>  
    )
  }

  menuConfig = [
    {
      text: '打印',
      key: 'printing',
      fn: (record) => {
        console.log(record)
      }
    }, {
      text: '打印2页',
      key: 'printpages',
      fn: (record) => {
        console.log(record)
      }
    }, {
      text: '呈批表',
      key: 'batchTable',
      fn: (record) => {
        console.log(record)
      }
    }, {
      text: '文件分发表',
      key: 'documentDistribution',
      fn: (record) => {
        console.log(record)
      }
    }, {
      text: '复制',
      key: 'copy',
      fn: (record) => {
        console.log(record)
      }
    }, {
      text: '删除',
      key: 'delete',
      fn: (record) => {
        console.log(record)
      }
    }
  ]

  // 操作
  handleMenu = (record) => {
    return (
      <ul className={"ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical"}>
        {
          this.menuConfig.map(item => {
            return (
              <li className="ant-dropdown-menu-item" 
                key={item.key} 
                onClick={() => item.fn(record)}>
                {item.text}
              </li>
            )
          })
        }
      </ul>
    )
  }

  // 数据列表
  setTableList = () => {
    TableConfig[TableConfig.length - 1].render = (text, record, index) => {
      return (
        <Dropdown overlay={this.handleMenu(record)} trigger={['click']} placement="topCenter">
          <Button>
            操作 <Icon type="down" />
          </Button>
        </Dropdown>
      )
    }
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

  // 新建来文
  addUnit = () => {
    this.setState({
      visible_addUnit: true
    })
  }

  handleModalVisible = (key, flag) => {
    let obj = {}
    obj[key] = flag;
    this.setState({
      ...obj
    })
  }

  render() {
    const { visible_addUnit, loading_addUnit } = this.state;
    const addUintProps = {
      title: '新建来文',
      AddUnitFromConfig: this.state.AddUnitFromConfig,
      visible: visible_addUnit,
      handleOk: () => {
        this.handleModalVisible('visible_addUnit', false);
      },
      handleCancel: () => {
        this.handleModalVisible('visible_addUnit', false);
      },
      width: 1000,
      footer: [
        <Button key="back" 
          onClick={() => {this.handleModalVisible('visible_addUnit', false)}}>
          取消
        </Button>,
        <Button key="submit" type="primary" 
          loading={loading_addUnit} >
          保存
        </Button>,
      ]
    }
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>来文管理</Breadcrumb.Item>
        </Breadcrumb>

        <div className="tabel-base-wrap">
          {this.setTableFrom()}

          <div className={'tableListOperator'}>
            <Button
              icon='plus'
              type='primary'
              onClick={() => this.addUnit()}>
              新建来文
            </Button>
          </div>

          {this.setTableList()}
          <AddUnit  {...addUintProps} />
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
