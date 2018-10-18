
import React, { Component } from 'react';
import { Row, Col, Input, Select, DatePicker, Checkbox, Radio } from 'antd';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import styles from '../styles/common.less';
import DateComponent from './DateComponent';
import AutoCompleteComponent from './AutoCompleteComponent';
import AutoCheckBoxComponent from './AutoCheckBoxComponent';

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
/**
 * queryFields: 页面查询的字段数组；
 * callBack: 选择的值回调；
 * style：查询表单的样式;
 *
 */
class AutoFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {},
    };
    const { queryFields, callBack } = this.props;
    queryFields && queryFields.forEach((item) => {
      if (item.field.length > 1) {
        [].concat(item.field).forEach((i) => {
          this.state.inputValue[i] = '';
        })
      } else {
        this.state.inputValue[item.field] = '';
      }
    });

    this.inputValueChange = {};
    Object.keys(this.state.inputValue).forEach((key) => {
      this.inputValueChange[key] = (e, option) => {
        let data;
        if (e && option) {
          Object.assign(this.state.inputValue, { [key]: e });
          data = Object.assign({}, { [key]: e });
        } else if (e && e.target) {
          Object.assign(this.state.inputValue, { [key]: e.target.value });
          data = Object.assign({}, { [key]: e.target.value.replace(/^\s+|\s+$/g, '') });
        } else if (e) {
          Object.assign(this.state.inputValue, { [key]: e });
          data = Object.assign({}, { [key]: e });
        } else {
          Object.assign(this.state.inputValue, { [key]: '' });
          data = Object.assign({}, { [key]: '' });
        }
        this.setState({
          inputValue: this.state.inputValue,
        });

        if (callBack) {
          callBack(data);
        }
      }
    });
  }


  onPressEnter = () => {
    const { onPressEnter } = this.props;
    if (typeof (onPressEnter) === 'function') {
      onPressEnter();
    }
  }


  /**
   * [generateInput description]
   * @return {[type]} [description]
   * 传入的数据示例
   * {
     field: 'recycle',
     name: '计划回收数量(报废车架)',
     nameStyle: { marginLeft: 70, width: 180 },
     sortBy: 5,
     type: 'input',
     disabled: false,
     style: { width: 200 },
     className: ''
   }
   */
  generateInput() {
    const { queryFields } = this.props;
    const inputWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'input';
    }).map((item) => {
      return (
        <div style={Object.assign({ display: 'inline-block' }, item.style)} key={item.sortBy}>
          <span style={Object.assign({ display: 'inline-block' }, item.nameStyle)}>{ item.name }{item.important? <span><span style={{color: 'red', fontFamily: 'PingFangSC-Regular'}}>*</span>:</span>: ''}</span>
          <div style={Object.assign({ display: 'inline-block' }, item.contentStyle)}>
            <Input
              placeholder={`请输入${item.placeholder}`}
              onChange={this.inputValueChange[item.field]}
              value={item.value}
              maxLength="40"
              disabled={item.disabled}
              style={{ width:item.width?item.width:180, marginLeft: 15 }}
              onPressEnter={this.onPressEnter}
            />
          </div>
        </div>
      )
    });

    return inputWrap;
  }

  /**
   * [generateSelect description]
   * @return {[type]} [description]
   *
   *{
     field: 'store_status',
     name: '库存状态',
     sortBy: 4,
     type: 'select',
     options: DictData.applyStatus,
     disabled: true,
     defaultValue: '维修品',
     style: {},
     className: '',
   }
   */
  generateSelect() {
    const { queryFields } = this.props;
    const selectV = [[], [], [], []];
    const selectWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'select';
    }).map((item, idx) => {
      if (item.options && item.options.length > 0) {
        for (let i = 0; i < item.options.length; i += 1) {
          if (selectV[idx]) {
            selectV[idx].push(
              <Select.Option
                key={i.toString(36)}
                value={`${item.options[i].code}`}
                selected={i === 2}
              >
                {item.options[i].name}
              </Select.Option>);
          }
        }
      }
      return (
        <div key={item.sortBy} className={item.className} style={Object.assign({ display: 'inline-block' }, item.style)}>
          <span style={Object.assign({ display: 'inline-block' }, item.nameStyle)}>{item.name}{item.important? <span><span style={{color: 'red', fontFamily: 'PingFangSC-Regular'}}>*</span>:</span>: ''}</span>
          <div style={Object.assign({ display: 'inline-block' }, item.contentStyle)}>
            <Select
              disabled={item.disabled}
              defaultValue={item.defaultValue !== '' && typeof (item.defaultValue) !== 'undefined' ? item.defaultValue : '全部'}
              style={{ width: 180, marginLeft: 15 }}
              placeholder={`请选择${item.name}`}
              className={styles.comItem}
              onSelect={this.inputValueChange[item.field]}
              value={item.value}
            >
              {selectV[idx]}
            </Select>
          </div>
        </div>
      )
    });
    return selectWrap;
  }

    /**
   * [generateSelect description]
   * @return {[type]} [description]
   *
   *{
     field: 'store_status',
     name: '库存状态',
     sortBy: 4,
     type: 'radio',
     options: DictData.applyStatus,
     disabled: true,
     defaultValue: '维修品',
     style: {},
     className: '',
   }
   */
  generateRadio() {
    const { queryFields } = this.props;
    const selectV = [[]];
    const selectWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'radio';
    }).map((item, idx) => {
      if (item.options && item.options.length > 0) {
        for (let i = 0; i < item.options.length; i += 1) {
          if (selectV[idx]) {
            selectV[idx].push(
              <RadioButton
                key={i.toString(36)}
                value={`${item.options[i].code}`}
              >
                {item.options[i].name}
              </RadioButton>);
          }
        }
      }
      return (
        <div key={item.sortBy} className={item.className} style={Object.assign({ display: 'inline-block' }, item.style)}>
          <span style={Object.assign({ display: 'inline-block' }, item.nameStyle)}>{item.name}</span>
          <div style={Object.assign({ display: 'inline-block' }, item.contentStyle)}>
            <RadioGroup
              disabled={item.disabled}
              defaultValue={item.defaultValue !== '' && typeof (item.defaultValue) !== 'undefined' ? item.defaultValue : ''}
              onChange={this.inputValueChange[item.field]}
              value={item.value}
            >
              {selectV[idx]}
            </RadioGroup>
          </div>
        </div>
      )
    });
    return selectWrap;
  }

/**
 * [generateAutoComplete description]
 * @return {[type]} [description]
 * warehouse/get_warehouse_list
 */
  generateAutoComplete() {
    const { queryFields } = this.props;
    const autoWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'autocomplete';
    }).map((item) => {
      return (
        <div key={item.sortBy} style={Object.assign({ display: 'inline-block' }, item.style)}>
          <span style={Object.assign({ display: 'inline-block' }, item.nameStyle)}>{item.name}</span>
          <div style={Object.assign({ display: 'inline-block' }, item.contentStyle)}>
            <AutoCompleteComponent
              dataUrl={item.dataUrl}
              onSelect={this.inputValueChange[item.field]}
              dispatchName={item.dispatchName}
              placeholder={item.placeholder}
              defaultQueryField={item.defaultQueryField}
              queryParams={item.queryParams}
              className={styles.comItem}
              style={{ width: 180, marginLeft: 15 }}
            />
          </div>
        </div>
      )
    });

    return autoWrap;
  }

/**
 * [generaterTime description]
 * @return {[type]} [description]
 * 传参示例
 *   //  {
   //   field: 'start_time',
   //   name: '时间',
   //   sortBy: 12,
   //   type: 'time',
   //   disabled: false,
   //   style: {},
   //   className: ''
   // },
 */
  generaterTime() {
    const { queryFields } = this.props;
    const timeWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'time';
    }).map((item) => {
      const { sortBy, name, field, disabled, style } = item;
      const { comRow, comItem } = styles;
      return (
        <div key={sortBy} style={style}>
          <span className={comRow} style={{ display: 'inline-block' }}>{name}</span>
          <div style={{ display: 'inline-block' }}>
            <DatePicker
              onChange={this.inputValueChange[field]}
              disabled={disabled}
              value={item.value}
              style={style}
              className={comItem}
            />
          </div>
        </div>
      )
    });
    return timeWrap;
  }


  generaterDate() {
    const { queryFields } = this.props;
    const timeWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'date';
    }).map((item) => {
      const { sortBy, name, field, disabled, style } = item;
      const { comRow, comItem } = styles;
      return (
        <div key={sortBy} className={item.className} style={Object.assign({ display: 'inline-block' }, item.style)}>
          <span className={comRow} style={{ display: 'inline-block' }}>{name}</span>
          <div style={{ display: 'inline-block' }}>
            <DatePicker
              onChange={this.inputValueChange[field]}
              disabled={disabled}
              allowClear={false}
              style={{ width: 180, marginLeft: 15 }}
              disabledDate={this.disabledDate}
              value={item.value}
              className={comItem}
            />
          </div>
        </div>
      )
    });
    return timeWrap;
  }

  // disabledDate = (current, end) => {
  //   return current && current.valueOf() <= moment().valueOf() - 86400000 * 29*6;
  // }
/**
 * [generaterRangeTime description]
 * @return {[type]} [description]
 * 传参示例
 *   //  {
   //   field: 'start_time',
   //   name: '时间',
   //   sortBy: 12,
   //   type: 'rangeTime',
   //   disabled: false,
   //   style: {},
   //   className: ''
   // },
 */
  generaterRangeTime() {
    const { queryFields } = this.props;
    const timeWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'rangeTime';
    }).map((item) => {
      const { sortBy, name, field, disabled, style, value } = item;
      const { comRow, comItem } = styles;
      return (
        <div key={item.sortBy} className={item.className} style={Object.assign({ display: 'inline-block' }, item.style)}>
          <span className={comRow} style={{ display: 'inline-block' }}>{name}</span>
          <div style={{ display: 'inline-block' }}>
            <RangePicker
              onChange={this.inputValueChange[field]}
              disabled={disabled}
              style={{ width: 180, marginLeft: 15 }}
              className={comItem}
              allowClear={false}
              defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]}
              value={item.value}
              disabledDate={this.disabledDate}
              showTime={{
                    hideDisabledOptions: true,
                    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }}
            />
          </div>
        </div>
      )
    });
    return timeWrap;
  }



/**
 * [generateMultiTime description]
 * @return {[type]} [description]
 *
 *     field: [
       'time1', 'time2'
     ],
     name: '时间',
     sortBy: 10,
     type: 'multitime',
     disabled: false || true
     style: {},
     className: ''
   }
 */
  generateMultiTime() {
    const { queryFields } = this.props;
    const timeWrap = queryFields && queryFields.filter((item) => {
      return item.type === 'multitime';
    }).map((item) => {
      return (
        <div key={item.sortBy} style={Object.assign({ display: 'inline-block' }, item.style)}>
          <span className={styles.comRow} style={{ display: 'inline-block' }}>{item.name}</span>
          <div style={{ display: 'inline-block' }}>
            <DateComponent
                callbackStart={this.inputValueChange[item.field[0]]}
                callbackEnd={this.inputValueChange[item.field[1]]}
                disabled={item.disabled}
                style={item.style}
                className={styles.comItem}
                allowClear={false}
              />
          </div>
        </div>
      )
    });
    return timeWrap;
  }

  generaterCheckBox() {
    const { queryFields } = this.props;
    const { options, defaultValue, classNames, sortBy, onChange } = queryFields;
    return (
      <AutoCheckBoxComponent
        options={options}
        defaultValue={defaultValue}
        classNames={classNames}
        sortBy={sortBy}
        onChange={onChange}
      />
    );
  }

  /**
   * [generaterForm description]
   * @return {[type]} [description]
   * 调用主方法
   */
  generaterForm() {
    let form = [];
    form = this.generateInput()
    .concat(this.generateSelect())
    .concat(this.generateAutoComplete())
    .concat(this.generaterTime())
    .concat(this.generaterDate())
    .concat(this.generateMultiTime())
    .concat(this.generaterRangeTime())
    .concat(this.generateRadio())
    .sort((a, b) => {
      return Number(a.key) > Number(b.key);
    });
    return (
      <div>
        {form}
      </div>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <div style={style}>
        {this.generaterForm() }
      </div>
    )
  }
}


AutoFieldComponent.propTypes = {
  queryFields: PropTypes.array.isRequired,
  callBack: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func,
  style: PropTypes.object,
};
export default AutoFieldComponent;
