import React, { Component } from 'react';
import { Input } from 'antd';

// 表格编辑
/**
 * number为  数字，正整数
 * float为小数
 * maxFloatLength:小数点后 数字的长度
 * maxNumberLength:数字长度
 */
class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estimateNum: this.props.estimateNum || '',
      isInput: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.estimateNum) {
      this.setState({ estimateNum: nextProps.estimateNum });
    }
  }

  onBlur = (e) => {
    const { value } = e.target;
    const { onChange } = this.props;
    if (value && onChange) {
      onChange(value);
    } else {
      onChange('');
    }
  }

  handleChange = (e) => {
    const inputValue = e.target.value;
    const { maxFloatLength, maxNumberLength } = this.props;
    let flag = true;
    if (this.props.isValid === 'number') {
      const { value } = e.target;
      const reg = /^[0-9]*$/;
      if (maxNumberLength) {
        flag = value.length <= maxNumberLength;
      }
      if ((flag && !isNaN(value) && reg.test(value))) {
        //this.props.onChange(value);
        this.setState({ estimateNum: inputValue });
      }
    } else if (this.props.isValid === 'float') {
      const { value } = e.target;
      const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if (value.indexOf('.') > -1 && maxFloatLength) {
        flag =
        (Math.abs((value.lastIndexOf('.', value.length - 1) - value.length)) - 1 <= maxFloatLength)
      }

      if ((flag && !isNaN(value)
          && reg.test(value)
          && value < 99999999999999)
          || value === '') {
        this.setState({ estimateNum: inputValue });
      }
    } else if (this.props.isValid === 'string') {
      const { value } = e.target;
      const testReg = /(^[a-zA-Z0-9\u4e00-\u9fa5_]{0,30})/;
      const isInput = testReg.test(value);
      if (isInput) {
        this.setState({
          estimateNum: value,
        })
      }
    }
  }

  render() {
    const { estimateNum } = this.state;
    const { style } = this.props;
  //  const ttip = this.props.isValid === 'number' ? '请输入整数' : '请输入小数';
  //  //<Tooltip placement="topLeft" title={ttip}>//</Tooltip>
    return (
      <div className="editable-cell">
        <div className="editable-cell-input-wrapper">
          <Input
            value={estimateNum}
            onChange={this.handleChange}
            style={style}
            placeholder="请输入"
            onBlur={this.onBlur}
            disabled={this.props.disabled === 'disabled'}
          />
        </div>
      </div>
    );
  }
}
export default EditableCell;
