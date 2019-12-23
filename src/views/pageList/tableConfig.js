import { getDectionaryLable } from '@utils'

export const TableConfig = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        /* defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order, */
        ellipsis: true
    }, {
        title: '标题',
        dataIndex: 'title',
    }, {
        title: '来文号',
        dataIndex: 'str2',
        render: (text, record, index) => {
            return `${record.str1}〔${record.year}〕${record.str2}`
        }
    }, {
        title: '紧急程度',
        dataIndex: 'urgency',
        render: (text, record, index) => {
            return getDectionaryLable(record.urgency);
        }
    }, {
        title: '密级',
        dataIndex: 'rank',
        render: (text, record, index) => {
            return getDectionaryLable(record.rank);
        }
    }, {
        title: '文件类型',
        dataIndex: 'communicationType',
        render: (text, record, index) => {
            return `${getDectionaryLable(record.year)}-${getDectionaryLable(record.communicationType)}`
        }
    }, {
        title: '收文号',
        sorter: true,
        dataIndex: 'num',
    },  {
        title: '操作'
    },
]
