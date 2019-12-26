import React from 'react';
import { Modal } from 'antd';

class AntModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false
    }
  }

  static defaultProps = {
    title: undefined,
    width: 600,
    forceRender: false,
    destroyOnClose: false,
    maskClosable: undefined, // 点击蒙层是否允许关闭
    footer: undefined,
    okText: undefined,
    confirmLoading: false
  }



  componentDidMount () {
    this.props.onRef(this);
  }


  openMoal = () => {
    this.handleModalVisible(true);
  }
  handleOk = () => {
    this.handleModalVisible(false);
  }
  handleCancel = () => {
    this.handleModalVisible(false);
  }
  handleModalVisible = (flag) => {
    this.setState({
      visible: flag
    });
  }

  render() {
    const { visible } = this.state;
    // const { handleOk } = this.props;
    return (
        <>
        {this.openMoal()}
        <Modal {...this.props} 
            visible={visible} 
            // onOk={handleOk || this.handleOk}
            onCancel={this.handleCancel}>
                {
                    React.Children.map(this.props.children, function(child){
                        return child
                    })                   
                }
        </Modal>
        </>
    );
  }
}


export default AntModal
