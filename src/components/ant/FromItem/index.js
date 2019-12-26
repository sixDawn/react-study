import React, { Component } from 'react'
import { Form, Input, Select, Cascader, DatePicker, InputNumber } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;

function setinput(props) {
    const { defaultValue, getFieldDecorator, tag, placeholder, onChange, 
        autoComplete, name, dateFormat, rules, index } = props;
    switch (tag) {
        case 'input':
            return getFieldDecorator(name, {
                rules: rules,
                initialValue: props.defaultValue || ''
            })(
                <Input 
                    index={index}
                    type={props.type}
                    autoComplete={autoComplete} 
                    placeholder={placeholder}
                    disabled={props.disabled}/>
            )
        case 'inputNumber':
            return getFieldDecorator(name, {
                rules: rules,
                initialValue: props.defaultValue || ''
            })(
                <InputNumber 
                    index={index}
                    type={props.type}
                    autoComplete={autoComplete} 
                    placeholder={placeholder}
                    min={props.min}
                    disabled={props.disabled}/>
            );
        case 'select':
            const options = props.options || [];
            return getFieldDecorator(name, {
                rules: rules,
                initialValue: props.defaultValue || undefined
            })(
                <Select
                    placeholder={placeholder} 
                    onChange={props.onChangeSelect} 
                    allowClear={props.allowClear}
                    disabled={props.disabled}
                    loading={props.loading}>
                    {
                        options.map((item, index) => {
                            return (
                                <Option key={index + Math.random()} 
                                        value={item.val || item.value} 
                                        disabled={item.disabled}
                                        item={item}>
                                    {item.text || item.label || item.value}
                                </Option>
                            )
                        })
                    }
                </Select>
            );
        case 'cascader': 
            return getFieldDecorator(name, {
                rules: rules,
                initialValue: props.defaultValue
            })(
                <Cascader
                    index={index}
                    placeholder={placeholder} 
                    options={props.options}
                    expandTrigger={props.expandTrigger}
                    displayRender={props.displayRender}
                    onChange={onChange}
                />
            );
        case 'DatePicker':
            return getFieldDecorator(name, {
                rules: rules,
                initialValue: defaultValue ? moment(defaultValue, dateFormat || 'YYYY-MM-DD') : null,
            })(
                <DatePicker 
                    // defaultValue={defaultValue ? moment(defaultValue, 'YYYY-MM-DD') : null }
                    index={index}
                    placeholder={placeholder}
                    format={dateFormat}
                    valueFormat={'YYYY-MM-DD'}
                    showTime={props.showTime}
                    />
            );
        case 'TextArea': 
            return getFieldDecorator(name, {
                rules: rules,
                initialValue: defaultValue,
            })(
                <TextArea 
                    index={index}
                    placeholder={placeholder}
                    rows = {props.rows}/>
            );
        case 'InputGroup':
            const group = props.InputGroup;
            return (
                <InputGroup>
                    {
                        /* Object.keys(group).map((key, index) => {
                            let item = JSON.parse(JSON.stringify(group[key]))
                            let params = {...AntFromItem.defaultProps, ...item, getFieldDecorator}
                           
                            return (
                                <FormItem key={key} className={`group-cell ${props.className}`}>{setinput(params)}</FormItem>
                            )
                        }) */
                        group.map((item) => {
                            let params = {...AntFromItem.defaultProps, ...item, getFieldDecorator}  
                            return (
                                <FormItem key={item.name} className={`group-cell ${props.className}`}>{setinput(params)}</FormItem>
                            )
                        })
                    }
                </InputGroup>
            )
        default:
            return (
                <>
                </>
            )
    }
}


export default class AntFromItem extends Component {
    static defaultProps = {
        label: '',
        name: '',
        required: undefined,
        type: 'text',
        tag: 'input',
        autoComplete: 'off',
        placeholder: '',
        // defaultValue: '',
        rules: [],
        disabled: false,
        loading: false,
        options: [], // select
        allowClear: true, // 支持清除
        expandTrigger: 'click', // hover
        getFieldDecorator: () => {},
        handleChange: (val) => {
            console.log(val)
        },
        onChangeSelect: () => {},
        // Cascader选择后展示的渲染函数
        displayRender: (label, selectedOptions) => { 
            return label.join(' / ')
        },
        dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
        dateFormat: 'YYYY/MM/DD',
        showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
        onDateChange: (date, dateString) => {
            console.log(date, dateString);
        }
    }

    componentDidMount () {

    }

    setItem = (props) => {
        const { label, style, className, required} = props;
        return (
            <FormItem required={required} label={label} style={style} className={className}>
                {setinput(props)} 
            </FormItem>
        )
    }
    
    render() {
        const props = this.props;
        return (
            this.setItem(props)
        )
    }
}