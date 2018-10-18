import React, { Component, PropTypes } from 'react';
import { Modal, Card } from 'antd';
import 'antd/dist/antd.css';

export default class IdentifyImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.imgUrl,
      tag: this.props.tag,
      visible: false,
    };
    
  }
  componentDidMount() {
  }
  showModal = () => {
    const imgUrl = this.refs.img.getAttribute('data-imgUrl');
    this.setState({ imgUrl, visible: true });
  };
  hideModal = () => {
    this.setState({visible: false});
  };
  render() {
    return (
      <Card style={{ background: '#ECECEC'}}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ position: 'relative'}}>
          <span style={{ position: 'absolute', top: 15, padding: '5px 15px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#fff'}}>
            {this.props.tag}
          </span>
            <img style={{ height: 250 }} src={this.props.imgUrl} data-imgUrl={this.props.imgUrl} alt="" ref="img" onClick={this.showModal}/>
          </div>
          <Modal width={1000} visible={this.state.visible} footer={null} onCancel={this.hideModal}>
            <img alt="example" style={{ width: '98%' }} src={this.state.imgUrl} />
          </Modal>
        </div>
      </Card>
    );
  }
}
