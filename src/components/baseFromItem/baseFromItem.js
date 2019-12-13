import React, {Component} from 'react';
import { Form, Icon, Input } from 'antd';
import styles from './style.module.less';


class BaseFromItem extends Component {

  render() {
    const formConfig = this.props.formConfig;
    const getFieldDecorator  = this.props.getFieldDecorator;
    
    return (
      <div className={styles.itemWrap}>
           {
            formConfig.map((item,index) => {
              if (item.type === 'Password') {
                return (               
                  <Form.Item key={index}>
                    {getFieldDecorator(item.name, {
                        rules: item.rules
                      })(
                        <Input.Password
                          prefix={<Icon type={item.Input.IconType} style={item.Input.styles} />}
                          type={item.Input.type}
                          placeholder={item.Input.placeholder}
                          size={item.Input.size || ''}
                        />
                      )}
                  </Form.Item>
                )
              } else {
                return (               
                  <Form.Item key={index}>
                    {getFieldDecorator(item.name, {
                        rules: item.rules
                      })(
                        <Input
                          prefix={<Icon type={item.Input.IconType} style={item.Input.styles} />}
                          type={item.Input.type}
                          placeholder={item.Input.placeholder}
                          size={item.Input.size || ''}
                        />
                      )}
                  </Form.Item>
                )
              }
            })
          }
      </div>
    )
  }
}


export default BaseFromItem;
