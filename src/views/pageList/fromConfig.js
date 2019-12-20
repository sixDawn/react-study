// import { SelectDictionaryType1, SelectAdminList, SelectDictionary } from '@/services/api'

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


const getFromConfig = async (token) => {
    // let data = { token: this.state.token };
    // let arr = await SelectDictionaryType1(data);

    // let apiArr = [SelectDictionaryType1(data), SelectAdminList(data), SelectDictionary(data)];
}


export default getFromConfig
