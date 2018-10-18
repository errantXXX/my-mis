/**
 * Create by zhangpengchuan on 2017/10/30
 */
import React from 'react';
import style from '../styles/common.less';

const ReactUtils = {};

ReactUtils.generateTableColumns = (columnsArray) => {
  return columnsArray.map(item => {
    return {
      title: <span className={style.commonTable}>{item.title}</span>,
      dataIndex: item.key,
      key: item.key,
      width: item.width,
      render: text => <span className={style.commonTable}>{text}</span>,
    }
  })
}

export default ReactUtils;
