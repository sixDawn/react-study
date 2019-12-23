import React, { Component } from 'react'
import { Form, Input, Select, Cascader, DatePicker, InputNumber } from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;


function setinput(props) {
    const { defaultValue, getFieldDecorator, tag, placeholder, onChange, 
        autoComplete, name, dateFormat, rules } = props;
    switch (tag) {
        case 'input':
            return (
                <span>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: props.defaultValue || ''
                    })(
                        <Input 
                            type={props.type}
                            autoComplete={autoComplete} 
                            placeholder={placeholder}
                            disabled={props.disabled}/>
                    )}
                </span>
            )
        case 'inputNumber':
            return(
                <span>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: props.defaultValue || ''
                    })(
                        <InputNumber 
                            type={props.type}
                            autoComplete={autoComplete} 
                            placeholder={placeholder}
                            min={props.min}
                            disabled={props.disabled}/>
                    )}
                </span>
            );
        case 'select':
            return (
                <span>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: props.defaultValue || undefined
                    })(
                        <Select
                            placeholder={placeholder} 
                            onChange={props.handleChange} 
                            allowClear={props.allowClear}
                            disabled={props.disabled}
                            loading={props.loading}>
                            {
                                props.options.map((item, index) => {
                                    return (
                                        <Option key={index} 
                                                value={item.val || item.value} 
                                                disabled={item.disabled}>
                                            {item.text || item.label || item.value}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </span>
            );
        case 'cascader': 
            return (
                <span>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: props.defaultValue
                    })(
                        <Cascader
                            placeholder={placeholder} 
                            options={props.options}
                            expandTrigger={props.expandTrigger}
                            displayRender={props.displayRender}
                            onChange={onChange}
                        />
                    )}
                </span>
            )
        case 'DatePicker':
            return (
                <span>
                    {getFieldDecorator(name, {
                        rules: rules,
                        initialValue: defaultValue ? moment(defaultValue, dateFormat || 'YYYY-MM-DD') : null,
                    })(
                    <DatePicker 
                        // defaultValue={defaultValue ? moment(defaultValue, 'YYYY-MM-DD') : null }
                        placeholder={placeholder}
                        format={dateFormat}
                        valueFormat={'YYYY-MM-DD'}/>
                    )}
                </span>
            )
        default:
            return (
                <span></span>
            )
    }
}


function setItem(props){
    const { label, style, className } = props;
        return (
            <FormItem label={label} style={style} className={className}>
                {setinput(props)} 
            </FormItem>
        )
}

export default class AntFromItem extends Component {
    static defaultProps = {
        label: '',
        name: '',
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
        handleChange: () => {},
        // Cascader选择后展示的渲染函数
        displayRender: (label, selectedOptions) => { 
            return label.join(' / ')
        },
        dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
        dateFormat: 'YYYY/MM/DD',
        onDateChange: (date, dateString) => {
            console.log(date, dateString);
        }
    }

    componentDidMount () { }
    
    render() {
        const props = this.props;
        return (
            setItem(props)
        )
    }
}