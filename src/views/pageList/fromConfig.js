export const FromConfigObj = {
    title: {
        val: '',
        placeholder: '文件标题',
    },
    unit: {
        placeholder: '来文单位',
    },
    str1: {
        val: '',
        placeholder: '来文字',
    },
    year: {
        placeholder: '来文年',
    },
    str2: {
        placeholder: '来文号',
    },
    adminId: {
        placeholder: '拟办人',
        tag: 'select',
        loading: true,
        options: []
    },
    communicationTypeArr: {
        placeholder: '文件类型',
        tag: 'cascader',
        loading: true,
        options: []
    },
    rank: {
        placeholder: '密级',
        tag: 'select',
        loading: true,
        options: []
    },
    urgency: {
        placeholder: '紧急程度',
        tag: 'select',
        loading: true,
        options: []
    },
    num: {
        placeholder: '收文编号',
    },
    startDate: {
        placeholder: '选择日期',
        tag: 'DatePicker'
    },
    endDate: {
        placeholder: '选择日期',
        tag: 'DatePicker'
    },
}

export const AddUnitFrom = {
    urgency: {
        name:'urgency',
        placeholder: '紧急程度',
        label: '紧急程度',
        tag: 'select',
        loading: true,
        style: {
            width: '50%',
            marginRight: 0,
            paddingRight: '16px'
        },
        className: 'item-half',
        rules: [{
            required: true,
            message: '请选择一个紧急程度',
        }],
    },
    rank: {
        name:'rank',
        label: '密级',
        placeholder: '密级',
        tag: 'select',
        loading: true,
        rules: [{
            required: true,
            message: '请选择一个【密级】类型',
        }],
    },
    count: {
        name:'count',
        label: '来文份数',
        placeholder: '来文份数',
        tag: 'inputNumber',
        min: 0,
    },
    date: {
        name:'date',
        label: '收文时间',
        tag: 'DatePicker',
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        rules: [{
            required: true,
            message: '请填写收文时间',
        }],
        placeholder: '请选择日期时间',
    },
    str1_year_str2: {
        label: '来文号',
        tag: 'InputGroup',
        className: 'item-points-3',
        InputGroup: {
            str1: {
                label: '来文号',
                name:'str1',
            },
            year: {
                name:'year',
                tag: 'select',
                placeholder: '来文年',
                loading: false
            },
            str2: {
                name:'str2'
            }
        }
    },
    unit: {
        name:'unit',
        label: '来文单位',
        placeholder: '请填写来文单位',
        rules: [{
            required: true,
            message: '请填写来文单位',
        }],
    },
    year_communicationType: {
        label: '文件类型',
        tag: 'InputGroup',
        placeholder: '文件类型',
        className: 'item-points-2',
        InputGroup: {
            year: {
                name:'year',
                tag: 'select',               
                placeholder: '来文年',
                disabled: true,
            },
            communicationType: {
                name:'communicationType',
                tag: 'select',
                placeholder: '文件类型',
            }
        }
    },
    num: {
        name:'num',
        label: '收文号',
        placeholder: '收文号',
    },
    title: {
        name:'title',
        label: '文件标题',
        placeholder: '请输入文件标题',
        className: 'item-row',
        rules: [{
            required: true,
            message: '请填写文件标题',
        }]
    },
    summary: {
        name:'summary',
        label: '摘要',
        tag: 'TextArea',
        rows: 5,
        className: 'item-row',
        placeholder: '请输入摘要',
    },
    reply: {
        name:'reply',
        label: '拟办意见',
        tag: 'TextArea',
        rows: 20,
        className: 'item-row',
        placeholder: '请输入拟办意见',
    },
    remark: {
        name:'remark',
        label: '备注',
        tag: 'TextArea',
        rows: 5,
        className: 'item-row',
        placeholder: '请输入备注',
    },
    files: {
        name:'files',
        label: '上传附件',
        placeholder: '上传附件',
    }
};

export const FromConfig = [
    {
        name:'title',
        placeholder: '文件标题',
    }, {
        name:'unit',
        placeholder: '来文单位',
    }, {
        name:'str1',
        placeholder: '来文字',
    }, {
        name:'year',
        placeholder: '来文年',
    }, {
        name:'str2',
        placeholder: '来文号',
    }, {
        name:'adminId',
        placeholder: '拟办人',
        tag: 'select',
        loading: true,
        options: []
    }, {
        name:'communicationTypeArr',
        placeholder: '文件类型',
        tag: 'cascader',
        loading: true,
        options: []
    }, {
        name:'rank',
        placeholder: '密级',
        tag: 'select',
        loading: true,
        options: []
    }, {
        name:'urgency',
        placeholder: '紧急程度',
        tag: 'select',
        loading: true,
        options: []
    }, {
        name:'num',
        placeholder: '收文编号',
    }, {
        name:'startDate',
        placeholder: '选择日期',
        tag: 'DatePicker'
    }, {
        name:'endDate',
        placeholder: '选择日期',
        tag: 'DatePicker'
    },
]

export const getAddUnitFromConfig = (self) => {
    let formItem = [
        {
            name:'urgency',
            placeholder: '紧急程度',
            label: '紧急程度',
            tag: 'select',
            loading: true,
            style: {
                width: '50%',
                marginRight: 0,
                paddingRight: '16px'
            },
            className: 'item-half',
            rules: [{
                required: true,
                message: '请选择一个紧急程度',
            }],
        }, {
            name:'rank',
            label: '密级',
            placeholder: '密级',
            tag: 'select',
            loading: true,
            rules: [{
                required: true,
                message: '请选择一个【密级】类型',
            }],
        }, {
            name:'count',
            label: '来文份数',
            placeholder: '来文份数',
            tag: 'inputNumber',
            min: 0,
        }, {
            name:'date',
            label: '收文时间',
            tag: 'DatePicker',
            dateFormat: 'YYYY-MM-DD HH:mm:ss',
            rules: [{
                required: true,
                message: '请填写收文时间',
            }],
            placeholder: '请选择日期时间',
        }, {
            name: 'str1_year_str2',
            label: '来文号',
            tag: 'InputGroup',
            className: 'item-points-3',
            InputGroup: [{
                label: '来文号',
                name:'str1',
                style: {
                    display: 'none'
                },
            }, {
                name:'year',
                tag: 'select',
                placeholder: '来文年',
                loading: false,
                style: {
                    display: 'none'
                },
            }, {
                name:'str2',
                style: {
                    display: 'none'
                },
            }]
        }, {
            name:'unit',
            label: '来文单位',
            placeholder: '请填写来文单位',
            rules: [{
                required: true,
                message: '请填写来文单位',
            }],
        }, {
            name:'year_communicationType',
            label: '文件类型',
            tag: 'InputGroup',
            placeholder: '文件类型',
            className: 'item-points-2',
            InputGroup: [{
                name:'year',
                placeholder: '来文年',
                tag: 'select',
                disabled: true,
                style: {
                    display: 'none'
                },
                onChangeSelect: (val, option) => {
                    self.setCommunicationType(val, option);
                }
            }, {
                name:'communicationType',
                tag: 'select',
                placeholder: '文件类型',
                style: {
                    display: 'none'
                },
                rules: [{
                    required: true,
                    message: '请选择文件类型',
                }],
                onChangeSelect: (val, option) => {
                    // self.setNum(val, option)
                },
                options: []
            }]
        }, {
            name:'num',
            label: '收文号',
            placeholder: '收文号',
        }, {
            name:'title',
            label: '文件标题',
            placeholder: '请输入文件标题',
            className: 'item-row',
            rules: [{
                required: true,
                message: '请填写文件标题',
            }]
        }, {
            name:'summary',
            label: '摘要',
            tag: 'TextArea',
            rows: 5,
            className: 'item-row',
            placeholder: '请输入摘要',
        }, {
            name:'reply',
            label: '拟办意见',
            tag: 'TextArea',
            rows: 20,
            className: 'item-row',
            placeholder: '请输入拟办意见',
        }, {
            name:'remark',
            label: '备注',
            tag: 'TextArea',
            rows: 5,
            className: 'item-row',
            placeholder: '请输入备注',
        }, {
            name:'files',
            label: '上传附件',
            placeholder: '上传附件',
        },
    ]

    formItem.map((item) => {
        if(item.tag === "InputGroup") {
            formItem = [...formItem, ...item.InputGroup]
        }
        return item
    });

    return formItem
}
