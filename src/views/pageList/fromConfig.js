import { SelectDictionaryType1, SelectAdminList, SelectDictionary } from '@/services/api'

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
            defaultValue: 1
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
            required: true,
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
                    self.onChange_year &&  self.onChange_year(val, option);
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
                    self.onChange_communicationType && self.onChange_communicationType(val, option);
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
            /* item.InputGroup.forEach(cell => {
                if(cell.tag && cell.tag !== 'input') {
                    formItem.push(cell)
                }
            }) */
        }
        return item
    });

    return formItem
}

export const getSelectOptions = async (token) => {
    const data = {token: token}
    const apiArr = [SelectDictionaryType1(data), SelectAdminList(data), SelectDictionary(data)]

    const options = await Promise.all(apiArr).then(res => {
        const communicationTypeArr = res[0].data[0].children;
        const adminIdArr = res[1].data;
        const dictionaryArr = res[2].data[0].children;

        let selectOptions = {
            /**  select下拉数据框
             * 拟办人
             * 文件类型
             * 密级
             * 紧急程度
             */
            adminId: [],
            communicationTypeArr: [],
            communicationType: [],
            rank: [],
            urgency: []
        };

        // 下拉选项
        dictionaryArr.map(item => {
            if (item.name === 'rank' || item.name === 'urgency') {
                selectOptions[item.name] = copyIdToVal(item.children);
            }
            return item
        });

        selectOptions = {
            ...selectOptions,
            adminId: adminIdArr.map(item => {
                item.value = item.adminId
                item.text = item.adminName
                return item
            }),
            communicationTypeArr: communicationTypeArr,
        }
        
        return selectOptions
    });

    return options
}

function copyIdToVal(arr){
    arr.map(item => {
        item.val = item.id;
        return item
    })
    return arr
}
