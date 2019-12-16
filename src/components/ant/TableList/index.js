import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'

import styles from './index.module.less'

const data = {
  list: []
}

class TableList extends Component {
  state = {
    loading: false,
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    data: data,
    pagination: data.pagination
  }

  render () {
    const { list, loading, TableConfig, pagination } = this.props;
    const columns = TableConfig;
 
    return (
      <Table
        className={styles.tableList}
        loading={loading}
        rowKey={record => record.id}
        columns={columns}
        dataSource={list}
        pagination={pagination}
        // pagination={paginationProps}
        // onChange={this.handleTableChange}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dictionary: state.dictionary
  }
}
export default connect(mapStateToProps)(TableList)