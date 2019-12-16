
export const TableConfig = [
    {
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    }, {
        title: '标题',
        dataIndex: 'title',
    }, {
        title: '来文号',
        dataIndex: 'summary',
    }, {
        title: '紧急程度',
        dataIndex: 'rank',
    }, {
        title: '密级',
        dataIndex: 'remark',
    }, {
        title: '文件类型',
        dataIndex: 'myNumber',
    }, {
        title: '收文号',
        dataIndex: 'reply',
    },  {
        title: '操作',
        dataIndex: 'communicationType',
    },
]
