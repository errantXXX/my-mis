
import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

const CheckboxGroup = Checkbox.Group;
class AutoCheckBoxComponent extends Component {

  onChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    // const r = this.props.options && this.props.options.map((item, idx) => {
    //   return (
    //     <Checkbox
    //       key={idx}
    //       defaultChecked={item.checked}
    //       disabled={item.disabled}
    //       style={item.style}
    //       value={item.value}
    //     >
    //       {item.name}
    //     </Checkbox>
    //   )
    // });
    const { sortBy, options, className, defaultValue } = this.props;
    return (
      <CheckboxGroup
        key={sortBy}
        options={options}
        className={classNames(className)}
        onChange={this.onChange}
        defaultValue={defaultValue}
      />
    );
  }
}

AutoCheckBoxComponent.defaultProps = {
  defaultValue: [],
  className: '',
  sortBy: 1,
};

AutoCheckBoxComponent.propTypes = {
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.array,
  className: PropTypes.string,
  sortBy: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AutoCheckBoxComponent;
