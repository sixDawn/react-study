import React from 'react';
import AntdEmpty from '@components/ant/Empty/Empty'



class RenderInfo extends React.Component {
  static defaultProps = {
    emptyState: null,
    dataInfo: null,
    dataPanel: null
  }

  render() {
    return (
        <div style={{ padding: 24, background: '#fff', minHeight: 360, position: 'relative' }}>
            {this.renderDataInfo()}
        </div>
    );
  }

  renderDataInfo = () => {
    if(this.props.dataInfo || this.props.dataPanel) {
        return this.props.dataPanel
    } else {
        return (
        <AntdEmpty {...this.props.emptyState}>
            <div dangerouslySetInnerHTML={{__html: this.props.content}}></div>
            {this.props.children}
        </AntdEmpty>
        )
    }
  }

}

export default RenderInfo;
