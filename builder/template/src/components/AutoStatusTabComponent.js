
import React, { Component } from 'react';
import { Radio } from 'antd';
import { PropTypes } from 'prop-types';

/*****
数据格式示例
const statusData = [
  {
    code: '',
    name: '全部',
    value: all_num,
  },
  {
    code: '100',
    name: '草稿',
    value: all_num,
  }]
**/

class AutoStatusTabComponent extends Component {

  OnChange = (e) => {
    this.props.handleSizeChange(e);
  }
  render() {
    const arr = this.props.statusData.map((item) => {
      return (
        <Radio.Button value={item.code} key={item.code}>
          {item.name}
          { typeof(item.value) !== 'undefined'
            &&  item.value !== '' ? <span>({item.value})</span> : 0 }
        </Radio.Button>
      )
    });

    return (
      <Radio.Group value={this.props.size} onChange={this.OnChange}>
        {arr}
      </Radio.Group>
    )
  }
}

AutoStatusTabComponent.defaultProps = {
  size: '',
};

AutoStatusTabComponent.propTypes = {
  statusData: PropTypes.array.isRequired,
  handleSizeChange: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
};

export default AutoStatusTabComponent;
