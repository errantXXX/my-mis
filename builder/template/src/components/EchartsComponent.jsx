import React, { Component } from 'react'
// echarts 
import echarts from 'echarts/lib/echarts';    //必须
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


export default class EhartsLine extends Component {
    constructor(props) {
        super(props)
    }
    componentDidUpdate(){
        var options = this.props.options;
        let myChart = echarts.init(this.refs.echarts);
        myChart.setOption(options)        
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (JSON.stringify(this.props.options) !== JSON.stringify(nextProps.options)) {
        return true;
      }
      return false;
    }
  
    componentDidMount() {
        const { options } = this.props
        let myChart = echarts.init(this.refs.echarts);
        myChart.setOption(options)
    }
  render() {
    return (
      <div>
        <div ref="echarts" style={{width:this.props.width,height:this.props.height}}></div>
      </div>
    )
  }
}
