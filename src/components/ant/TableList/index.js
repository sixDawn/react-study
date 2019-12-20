import React from 'react'
import { Table } from 'antd'
import styles from './index.module.less'

const TableList = (props) => {
  return (
    <Table
      className={styles.tableList}
      loading={props.loading}
      rowKey={record => record.id}
      columns={props.TableConfig}
      dataSource={props.list}
      pagination={props.pagination}
      // pagination={paginationProps}
      onChange={props.onChange}
    />
  )
}


export default TableList
