import React, { Component } from 'react';
import { Col, DatePicker } from 'antd';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import styles from '../styles/common.less';
// 创建时间
class DateComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeError: false,
      startTime: '',
      endTime: '',
    };
  }

  startTimeOnclick = (date, dateString) => {
    const { callbackStart } = this.props;

    if (!date) {
      this.setState({
        startTime: null,
      }, () => {
        callbackStart(this.state.startTime);
      })
      return;
    }
    const timer = moment(date.valueOf()).format('YYYY-MM-DD 00:00:00');
    this.setState({
      startTime: moment(timer).format('X'),
    }, () => {
      callbackStart(this.state.startTime);
    })
  }
  endTimeOnclick = (date, dateString) => {
    const { callbackEnd } = this.props;
    if (!date) {
      this.setState({
        endTime: null,
      }, () => {
        callbackEnd(this.state.endTime);
      })
      return;
    }
    const timers = moment(date.valueOf()).format('YYYY-MM-DD 23:59:59');
    this.setState({
      endTime: moment(timers).format('X'),
    }, () => {
      callbackEnd(this.state.endTime);
    })
  }
  render() {
    const { defaultDateStart, defaultDateEnd } = this.props;
    return (
      <div>
        <Col>
          <div className={styles.dateWrap}>
            <DatePicker
              style={{ marginRight: 10, width: 120, marginLeft: 10, height: 28 }}
              onChange={this.startTimeOnclick}
              defaultValue={defaultDateStart}
            />
          </div>
          <div className={styles.dateWrap}>
            <DatePicker
              style={{ width: 120, height: 28 }}
              onChange={this.endTimeOnclick}
              defaultValue={defaultDateEnd}
            />
          </div>
        </Col>
      </div>
    )
  }
}

DateComponent.propTypes = {
  callbackStart: PropTypes.func.isRequired,
  callbackEnd: PropTypes.func.isRequired,
  defaultDateStart: PropTypes.object,
  defaultDateEnd: PropTypes.object,
};
export default DateComponent;
