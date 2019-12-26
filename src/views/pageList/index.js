import React from 'react';
import { connect } from 'react-redux';
import { Layout, Breadcrumb, Dropdown, Button, Icon } from 'antd';
import TableList from '@components/ant/TableList';
import TableFrom from '@components/ant/TableFrom';
import AddUnit from './addUnit';
import { FromConfig, getSelectOptions } from './fromConfig';
import { TableConfig } from './tableConfig';
import { SelectDocument } from '@/services/api';
import { objIsEmpty } from '@utils';

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
      addUintFromVal: null,
      uintTitle: '新建来文'
    }
  }
  
  async componentDidMount () {
    this.getTabelList(this.state.formValues);
    await this.setSelectOptions();
  }

  /**
   * 数据查询表单相关
   * @setTableFrom 设置表单
   * @setSelectOptions 设置表单中的select下拉框
   */
  setTableFrom = () => {
    const fromConfig = {
      FromConfig: this.state.FromConfig,
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
          formValues: data
        }, () =>{
          this.getTabelList();
        })
      },
      handleFormReset: (vals) => {
        this.setState({
          pagination: {
            ...this.state.pagination,
            current: 1
          },
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
  setSelectOptions = async () => {
    const selectOptions = await getSelectOptions();
    const fromItem = this.getFromItem_select(selectOptions);
  
    this.setState({
      FromConfig: fromItem
    })
  }
  getFromItem_select = (selectOptions) => {
    const fromItem = this.state.FromConfig;
    fromItem.map(item => {
      const name = item.name;
      if (selectOptions[name]) {
        item.options = selectOptions[name];
        item.loading = false;
      }
      return item
    });
    return fromItem
  }

  /**
   * tabel数据列表
   * @setTableList 设置数据列表
   * @getTabelList 获取列表数据
   * @handleMenu 数据列表_操作项
   */
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
    const { list, loading, pagination, formValues }  = this.state;
    const tableConfig = {
      list: list,
      loading: loading,
      TableConfig: TableConfig,
      pagination: pagination,
      onChange: (pagination, filters, sorter, extra) => {
        // 排序
        if (!objIsEmpty(sorter)) {
          const orderBy = sorter.order ? `${sorter.field} ${sorter.order === 'ascend' ? 'asc' : 'desc' }` : '';
          this.setState({
            formValues: {
              ...formValues,
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
  menuConfig = [
    {
      text: '打印',
      key: 'printing',
      fn: (record) => {
      }
    }, {
      text: '打印2页',
      key: 'printpages',
      fn: (record) => {
      }
    }, {
      text: '呈批表',
      key: 'batchTable',
      fn: (record) => {
      }
    }, {
      text: '文件分发表',
      key: 'documentDistribution',
      fn: (record) => {
      }
    }, {
      text: '复制',
      key: 'copy',
      fn: (record) => {
      }
    }, {
      text: '删除',
      key: 'delete',
      fn: (record) => {
      }
    }, {
      text: '编辑',
      key: 'edit',
      fn: (record) => {
        this.setState({
          uintTitle: '编辑来文'
        }, () => {
          this.child.edit(record);
        })
      }
    }
  ]
  
  onRef = (ref) => {
    this.child = ref
  }
  openMoal = () => {
    this.child.openMoal()
  }

  
  handleModalVisible = (key, flag) => {
    let obj = {}
    obj[key] = flag;
    this.setState({
      ...obj
    })
  }

  render() {
    const { token, addUintFromVal, uintTitle } = this.state;
    const addUintProps = {
      title: uintTitle,
      token: token,
      addUintFromVal: addUintFromVal
    }

    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>来文管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className="tabel-base-wrap">
          {this.setTableFrom()}
          
          <AddUnit onRef={this.onRef} {...addUintProps} />

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
