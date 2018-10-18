
import React, { Component } from 'react';
import { Button, Col } from 'antd';
import { PropTypes } from 'prop-types';

/**
数据格式
let arr =[
{
  icon:'',
  style:{marginBottom: 10},
  onClick:'',
  href:'',
  type:'',
  name:'',
  disabled: true || false,
};
]
**/

class AutoBtnComponent extends Component {

  render() {
    const { btnData } = this.props;
    const btns = btnData && btnData.map((item) => {
      return (
        item.href === '' ?
          <Button
            key={item.id}
            type={item.type}
            icon={item.icon}
            style={item.style}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.name}
          </Button>
          :
          <a href={item.href} key={item.id}>
            <Button
              key={item.id}
              type={item.type}
              icon={item.icon}
              style={item.style}
              disabled={item.disabled}
            >
              {item.name}
            </Button>
          </a>
      )
    })

    return (
      <span>
        { btns }
      </span>
    )
  }
}

AutoBtnComponent.defaultProps = {
  size: '',
};

AutoBtnComponent.propTypes = {
  btnData: PropTypes.array.isRequired,
};

export default AutoBtnComponent;
