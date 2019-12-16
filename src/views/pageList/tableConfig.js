import { getDectionaryLable } from '@utils'

export const TableConfig = [
    {
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.id - b.id,
        width: 70
    }, {
        title: '标题',
        dataIndex: 'title',
        width: 230
    }, {
        title: '来文号',
        dataIndex: 'str2',
        width: 160,
        render: (text, record, index) => {
            return `${record.str1}〔${record.year}〕${record.str2}`
        }
    }, {
        title: '紧急程度',
        dataIndex: 'urgency',
        width: 160,
        render: (text, record, index) => {
            return getDectionaryLable(record.urgency);
        }
    }, {
        title: '密级',
        dataIndex: 'rank',
        width: 160,
        render: (text, record, index) => {
            return getDectionaryLable(record.rank);
        }
    }, {
        title: '文件类型',
        dataIndex: 'communicationType',
        width: 198,
        render: (text, record, index) => {
            return `${getDectionaryLable(record.year)}-${getDectionaryLable(record.communicationType)}`
        }
    }, {
        title: '收文号',
        dataIndex: 'num',
    },  {
        title: '操作',
        width: 198,
    },
]
