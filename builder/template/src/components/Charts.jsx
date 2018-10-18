import React, { Component, PropTypes } from 'react';
import { Row, Col, DatePicker, Button } from 'antd';

const echarts = require('echarts');

export default class Charts extends Component {
  componentDidMount() {
    this.chart = echarts.init(this.echartsDOM);
    this.chart.setOption(this.props.options);
  }

  componentWillReceiveProps(nextProps) {
    this.chart.setOption(nextProps.options);
  }

  render() {
    return (
      <div
        ref={(c) => { this.echartsDOM = c; }}
        style={Object.assign({}, { display: 'flex', height: '400px' }, this.props.style || {})}
      />
    )
  }
}

Charts.propTypes = {
};
