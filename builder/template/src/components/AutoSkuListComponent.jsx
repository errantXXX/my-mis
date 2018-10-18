
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from '../styles/common.less';
import AutoCompleteComponent from './AutoCompleteComponent';

class AutoSkuListComponent extends Component {

  onSelect = (e) => {
    this.props.onSelect(e);
  }
  onChange= (e) => {
    this.props.onChange(e);
  }

  onSearch = (e) => {
    this.props.onSearch(e);
  }

  render() {
    return (
      <div>
        <span style={{ color: '#f04134', marginRight: '5px' }}>*</span>
        <span>添加SKU</span>
        <AutoCompleteComponent
          dataUrl="sku/get_list"
          onSelect={this.onSelect}
          onChange={this.onChange}
          onSearch={this.onSearch}
          dispatchName="getList"
          placeholder="请输入SKU"
          defaultQueryField="name"
          className={styles.comItem}
          queryParams={{ page: 1, perpage: 10 }}
        />
      </div>
    )
  }
}

AutoSkuListComponent.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default AutoSkuListComponent;
