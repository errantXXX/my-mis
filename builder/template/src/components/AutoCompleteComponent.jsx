import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import { connect } from 'dva';
import { PropTypes } from 'prop-types';
import Fetch from '../utils/Fetch';
import Base from '../utils/base';
/*
  调用指南: 默认检索的键值是name
  <AutoCompleteCom
    dataUrl="supplier/get_supplier_list" //数据源地址
    onSelect={this.supplyReceiveValue} //获取选择数据的回调函数
    dispatchName="getSupplierList" //请求资源的dispathName
    placeholder="请输入供应商名称" //placeholder
    defaultQueryField="name" //默认检索以name，如果是其他值传入即可,先只支持单子段查询
    queryParams={{page: 1, perpage: 10}} //获取资源的请求参数,有就填写，没有就不填
    className={styles.comItem} //css类名
  />
*/
class AutoCompleteComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
    this.searchTimeOut = '';
  }

  // 值改变的时候的方法；
  autoChange = (value) => {
    const { dispatch, dataUrl, dispatchName, onSelect, queryParams } = this.props;
    let { defaultQueryField } = this.props;
    const param = {};
    defaultQueryField = defaultQueryField === '' || typeof (defaultQueryField) === 'undefined' ? 'name' : defaultQueryField;
    param[defaultQueryField] = value;

    if (value === '') {
      setTimeout(() => {
        onSelect();
      }, 0);
    }

    this.searchTimeOut && clearTimeout(this.searchTimeOut);

    if (value) {
      this.searchTimeOut = setTimeout(() => {
        Fetch.getSuggestList(dispatch,
          dataUrl,
          dispatchName,
          Object.assign({}, param, queryParams),
          (data) => {
            this.searchTimeOut = '';
            if (data.code === 0) {
              const arr = data.info.list.filter((a, b) => {
                return a.name !== null && typeof (a.name) !== 'undefined';
              }).map((a) => {
                return a.name;
              });

              this.setState({
                dataSource: arr,
              }, () => {
                const p = data.info.list.filter((a) => {
                  return value === a.name;
                });
                if (p.length > 0) {
                  const [f] = p;
                  onSelect(f);
                } else {
                  onSelect(value);
                }
              });
            } else {
              Base.ModFail('操作失败', data.message);
            }
          });
      }, 800);
    }
  }

  render() {
    const { dataSource } = this.state;
    const { placeholder, className, style } = this.props;
    return (
      <AutoComplete
        dataSource={dataSource}
        onSelect={this.autoChange}
        onSearch={this.autoChange}
        placeholder={placeholder}
        className={className}
        style={style}
      />
    )
  }
}

AutoCompleteComponent.defaultProps = {
  placeholder: '请输入',
  className: '',
  defaultQueryField: '',
  queryParams: {},
};

AutoCompleteComponent.propTypes = {
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  dataUrl: PropTypes.string.isRequired,
  dispatchName: PropTypes.string.isRequired,
  className: PropTypes.string,
  defaultQueryField: PropTypes.string,
  queryParams: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(AutoCompleteComponent);
