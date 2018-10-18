import React, { Component, PropTypes } from 'react';

const echarts = require('echarts');

export default class PieCharts extends Component {
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
        style={Object.assign({}, this.props.style || {}, { display: 'flex', height: '400px' })}
      />
    )
  }
}

PieCharts.propTypes = {
};
