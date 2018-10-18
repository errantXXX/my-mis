import React from 'react';
import moment from 'moment';
import styles from '../styles/common.less';

const TimeComponent = module.exports = {}

TimeComponent.Time = (x) => {
  const r = moment(x * 1000).format('YYYY-MM-DD HH:mm:ss');
  if (x === 3804163200 || r.slice(0, 4) === '1970') {
    return '--'
  }
  return r;
}

TimeComponent.Times = (x) => {
  const r = moment(x * 1000).format('YYYY-MM-DD');
  if (x === 3804163200 || r.slice(0, 4) === '1970') {
    return '--';
  }
  return r;
}

TimeComponent.Timed = (x) => {
  const r = moment(x * 1000).format('HH:mm:ss');
  if (x === 3804163200 || r.slice(0, 4) === '1970') {
    return '--';
  }
  if (r === '00:00:00') {
    return '--';
  }
  return r;
}

TimeComponent.TimeMonth = (x) => {
  const r = moment(x * 1000).format('YYYY-MM');
  if (x === 3804163200 || r.slice(0, 4) === '1970') {
    return '--'
  }
  return r;
}

TimeComponent.TimeYesterday = (x) => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  const oneday = 1000 * 60 * 60 * 24;
  const yesterday = new Date(today - oneday);
  const sad = moment(today).format('YYYY-MM-DD HH:mm:ss');
  const hay = moment(yesterday).format('YYYY-MM-DD HH:mm:ss')
  if (x === 'a') {
    return sad;
  } else if (x === 'b') {
    return hay;
  }
}
