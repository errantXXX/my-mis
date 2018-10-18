import React, { Component, PropTypes } from 'react';
import 'antd/dist/antd.css';
import { Row, Tabs, Col, Button, Table, Input, Select } from 'antd';

export default class IdentifyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: this.props.titleText,
    };
    
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: 5 }}>
        <div style={{ width: '100%', fontSize: 15, marginBottom: 20 }}>
          {this.state.titleText}
          <span style={{ marginLeft: 5, color: 'red' }}>
            {this.props.additionalText||""}
          </span>
          <Button style={{float:'right'}} onClick={this.props.reloadData}>重新载入数据</Button>
        </div>
      </div>
    );
  }
}
