import React, { Component, PropTypes } from 'react';
import { Spin, Icon } from 'antd';
import { connect } from 'dva';
import Container from '../components/Container';

class Loading extends Component {
  render() {
    const styles = {
      textAlign: 'center',
      width: '100px',
      height: '100px',
      position: 'absolute',
      left: '0',
      top: '0',
      right: '0',
      bottom: '0',
      margin: 'auto',
    };
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={styles}>
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
        </div>
      </div>
    )
  }
}

Loading.propTypes = {
};

export default connect()(Loading);
