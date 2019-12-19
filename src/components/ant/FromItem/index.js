import React, { Component } from 'react'
import { Form, Input, Select, Cascader } from 'antd'
import './style.less'


const FormItem = Form.Item;
const { Option } = Select;

function setItem(props){
    const { getFieldDecorator, tag, label, placeholder, autoComplete, name } = props;
    switch (tag) {
        case 'input':
            return (
                <FormItem label={label}>
                    {getFieldDecorator(name, {
                        rules: props.rules,
                        initialValue: props.defaultValue || ''
                    })(
                        <Input 
                            type={props.type}
                            autoComplete={autoComplete} 
                            placeholder={placeholder}
                            disabled={props.disabled}/>
                    )}
                </FormItem>
            );
        case 'select':
            return (
                <FormItem label={label}>
                    {getFieldDecorator(name, {
                        rules: props.rules,
                        initialValue: props.defaultValue
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
                                                value={item.value} 
                                                disabled={item.disabled}>
                                            {item.text || item.label || item.value}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
            );
        case 'cascader': 
            return (
                <FormItem label={label}>
                    {getFieldDecorator(name, {
                        rules: props.rules,
                        initialValue: props.defaultValue
                    })(
                        <Cascader
                            placeholder={placeholder} 
                            options={props.options}
                            expandTrigger={props.expandTrigger}
                            displayRender={props.displayRender}
                            onChange={props.onChange}
                        />
                    )}
                </FormItem>
            );
        default:
            return (
                <span></span>
            )
    }
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
        expandTrigger: "click", // hover
        getFieldDecorator: () => {},
        handleChange: () => {},
        // Cascader选择后展示的渲染函数
        displayRender: (label, selectedOptions) => { 
            return label.join(' / ')
        },
    }

    componentDidMount () { }
    
    render() {
        const props = this.props;
        return (
            setItem(props)
        )
    }
}