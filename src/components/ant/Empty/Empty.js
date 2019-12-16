import React, { Component } from 'react';
import { Empty } from 'antd';

class AntdEmpty extends Component {
    static defaultProps = {
        description: '暂无数据',
        // image: 'https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original',
        imageStyle: {
            // height: 160,
        },
        emptyWrapStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0
        },
        content: ''
    }

    render() {
        return (
            <div style={this.props.emptyWrapStyle}>
                <Empty 
                    image = {this.props.image}
                    imageStyle = {this.props.imageStyle}
                    description = {this.props.description}>
                    <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
                    {this.props.children}
                </Empty>
            </div>
        );
    }
}

export default AntdEmpty;
              