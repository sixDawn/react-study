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
        options: []
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

export const AddUnitFromConfig = [
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
        rules: [{
            required: true,
            message: '请填写收文时间',
        }],
        placeholder: '请选择日期时间',
    }, {
        name:'str1',
        placeholder: '来文年',
    }, {
        name:'unit',
        label: '来文单位',
        placeholder: '请填写来文单位',
        rules: [{
            required: true,
            message: '请填写来文单位',
        }],
    }, {
        name:'communicationType',
        label: '文件类型',
        tag: 'select',
        placeholder: '文件类型',
    }, {
        name:'year',
        placeholder: '来文年',
    }, {
        name:'num',
        label: '收文号',
        placeholder: '收文号',
    }, {
        name:'title',
        label: '文件标题',
        placeholder: '文件标题',
        rules: [{
            required: true,
            message: '请填写文件标题',
        }]
    }, {
        name:'summary',
        placeholder: '摘要',
    }, {
        name:'reply',
        placeholder: '拟办意见',
    }, {
        name:'remark',
        placeholder: '备注',
    }, {
        name:'files',
        placeholder: '上传附件',
    },
]

// 拟办人
export const getSelectOption_adminId = async (token) => {
    let res = await SelectAdminList({ token: token });
    return res.data
}

// 文件类型
export const getSelectOption_communicationType = async (token) => {
    let res = await SelectDictionaryType1({ token: token });
    return res
}


// 字典_密级, 紧急程度
export const getSelectOption_Dictionary = async (token) => {
    let res = await SelectDictionary({ token: token });
    return res
}

const getFromConfig = async (token) => {
    let data = { token: token };

    let apiArr = [SelectDictionaryType1(data), SelectAdminList(data), SelectDictionary(data)];
    
    Promise.all(apiArr).then(res => {
      const communicationTypeArr = res[0].data[0].children;
      const adminIdArr = res[1].data;
      const dictionaryArr = res[2].data[0].children;

      let rankSelect = [];
      let urgencySelect = [];

      // 下拉选项
      dictionaryArr.map(item => {
        if (item.name === 'rank') {
          rankSelect = item.children.map(rank => {
            rank.val = rank.id;
            return rank
          });
        } else if (item.name === 'urgency') {
          urgencySelect = item.children;
        }
        return item
      });

      const selectOptions = {
        adminId: adminIdArr.map(item => {
            item.value = item.adminId
            item.text = item.adminName
            return item
        }),
        communicationTypeArr: communicationTypeArr,
        rank: rankSelect,
        urgency: urgencySelect
      }
      
      this.state.FromConfig.map(item => {
        const name = item.name;
        if (selectOptions[name]) {
            item.options = selectOptions[name];
            item.loading = false;
        }
        return item
      });
      
    /* this.setState({
        FromConfig: FromItemArr
      })
    */
      return FromConfig

    }).catch(error => { });

}


export default getFromConfig
