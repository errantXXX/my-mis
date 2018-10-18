import React, { Component, PropTypes } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

export default class IdentifyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: '15px',
      userName: this.props.content.userName,
      operator: this.props.content.operator,
      details: this.props.content.details,
    };
    
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '5px' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
          <span style={{fontSize: this.state.fontSize, fontWeight: 'bold'}}>用户姓名:&nbsp;{this.props.content&&this.props.content.userName}</span>
          <span style={{fontSize: this.state.fontSize, fontWeight: 'bold'}}>by:{this.props.content&&this.props.content.operator}</span>
        </div>
        {this.props.content&&this.props.content.details.map((record, index) => {
          return (
            index !== (this.props.content&&this.props.content.details.length-1) ?
              (<div key={index} style={{display: 'flex', borderTop: '1px solid #e2e7eb', padding: '5px 15px'}}>
                <span style={{ flex: '1 1 50%' }}>{record[0]}</span>
                <span style={{ flex: '1 1 50%' }}>{record[1]}</span>
              </div>) :
              (<div key={index} style={{display: 'flex', borderTop: '1px solid #e2e7eb', borderBottom: '1px solid #e2e7eb', padding: '5px 15px'}}>
                <span style={{ flex: '1 1 50%' }}>{record[0]}</span>
                <span style={{ flex: '1 1 50%' }}>{record[1]}</span>
              </div>)
          )
        })}
      </div>
    );
  }
}
