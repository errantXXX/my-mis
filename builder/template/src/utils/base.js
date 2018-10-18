import React from 'react';
import { Modal, Button } from 'antd';
import moment from 'moment';
import styles from '../styles/common.less';

const Base = module.exports = {}

Base.ModSuccess = (title, content, onOk) => {
  Modal.success({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}

Base.ModFail = (title, content, onOk) => {
  Modal.error({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content || '服务错误'}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}
Base.ModFailSupply = (title, msg, data, onOk) => {
  Modal.error({
    title,
    content:
      <div>
        <div style={{ wordBreak: 'break-all' }}>{msg || '服务错误'}</div>
        <div style={{ wordBreak: 'break-all' }}>{data}</div>
      </div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}
Base.ModFailSupplyInfo = (title,code, msg, data, onOk) => {
  Modal.error({
    title,
    content:
      <div>
        <div style={{ wordBreak: 'break-all' }}>错误代号：{code?code:''}</div>
        <div style={{ wordBreak: 'break-all' }}>错误类型：{msg?msg:'服务错误'}</div>
        <div style={{ wordBreak: 'break-all' }}>错误描述：{data?data:''}</div>
      </div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}
Base.ModFailInfo = (title, msg, code, onOk) => {
  Modal.error({
    title,
    content:
      <div>
        <div style={{ wordBreak: 'break-all' }}>{msg || '服务错误'}</div>
        <div style={{ wordBreak: 'break-all' }}>{code}</div>
      </div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}

Base.ModConfirm = (title, content, onOk) => {
  Modal.confirm({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    onOk,
    onCancel() {},
  });
}

Base.ModInfo = (title, content, onOk) => {
  Modal.info({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}

Base.TabColumns = (lib) => {
  const co = lib.map((c, idx) => {
    return {
      key: '' + idx,
      title: <span>{c.name}</span>,
      dataIndex: c.dataIndex,
      render: typeof c.render === 'function' ? c.render : text => <span>{text}</span>,
      width: c.width,
    }
  });
  return co;
}

Base.TabPagination = (total) => {
  return {
    total,
    pageSize: 20,
    onShowSizeChange: (current, pageSize) => {
    },
    showTotal: (total, range) => `${range[0]}-${range[1]} 条 共 ${total} 条`,
    onChange: (current) => {
    },
  }
}

Base.TabPaginationBtn = (total, current) => {
  return {
    current,
    total,
    pageSize: 20,
    showTotal: (total, range) => `${range[0]}-${range[1]} 条 共 ${total} 条`,
    onShowSizeChange: (current, pageSize) => {
    },
    onChange: (current) => {
    },
  }
}

Base.BtnArry = (item, func, disabled) => item.map((i, idx) => {
  return (
    <span className={styles.commonBtn} key={idx}>
      { i === '' ? null :
      <Button type={item.length === 1 ? 'primary' : (idx % 2 !== 0 ? 'primary' : '')} style={{ marginRight: 5, fontWeight: 300 }} onClick={func[idx]} disabled={disabled[idx]}>
        {i}
      </Button>}
    </span>
  )
})

Base.BtnArryDanger = (item, func, disabled) => item.map((i, idx) => {
  return (
    <span className={styles.commonBtn} key={idx}>
      { i === '' ? null :
      <Button type={item.length === 1 ? 'primary' : (idx % 2 !== 0 ? 'danger' : 'primary')} style={{ marginRight: 5, fontWeight: 300 }} onClick={func[idx]} disabled={disabled[idx]}>
        {i}
      </Button>}
    </span>
  )
})

Base.LinkArry = (item, func) => item.map((i, idx) => {
  return (
    <span className={styles.commonBtn} key={idx}>
      { i === '' ? null :
      <span className={styles.aLink} onClick={func[idx]}>
        {i}
      </span>}
    </span>
  )
})

Base.Time = (x) => {
  const r = moment(x * 1000).format('YYYY-MM-DD HH:mm:ss');
  if (x === 3804163200 || r.slice(0, 4) === '1970') {
    return '--'
  }
  return r
}

Base.abnoTime = (x) => {
  const r = x;
  if (x.slice(0, 4) < '2014') {
    return ''
  }
  return r
}

// 添加后端返会的字段  适用于checkbox
Base.changeBackValue = (data) => {
  if (Array.isArray(data)) {
    data.forEach((v) => { Base.changeBackValue(v) })
  } else if (data && typeof data === 'object') {
    if (data.id) data.value = data.id;
    if (data.name) data.label = data.name;
    if (data.pri_name) data.label = data.pri_name;
    if (data.bank_name) data.label = data.bank_name;
    Object.keys(data).forEach(key => Base.changeBackValue(data[key]));
  }
  return data;
}
// 适应后端特殊字段  (数据遗留问题)
Base.esChangeBackValue = (data) => {
  if (Array.isArray(data)) {
    data.forEach((v) => { Base.esChangeBackValue(v) })
  } else if (data && typeof data === 'object') {
    if (data.id) data.code = data.id;
    if (data.city_name) data.name = data.city_name;
    if (data.zhanqu_name) data.name = data.zhanqu_name;
    if (data.department_name) data.name = data.department_name;
    if (data.company_name) data.name = data.company_name;
    if (data.railgroup_name) data.name = data.railgroup_name;
    if (data.role_name) data.name = data.role_name;
    if (data.org_name) data.name = data.org_name;
    if (data.bank_name) data.name = data.bank_name;
    if (data.name) data.name = data.name;
    if (data.post_name) data.name = data.post_name;
    if (data.provider_name) data.name = data.provider_name;
    if (data.staff_name) data.name = data.staff_name;
    Object.keys(data).forEach(key => Base.esChangeBackValue(data[key]));
  }
  return data;
}
// 深拷贝
Base.deepCopy = (obj) => {
  if (typeof obj !== 'undefined') {
    return JSON.parse(JSON.stringify(obj));
  }
}

// 多维转一维数组
Base.reduceDimension = (arr) => {
  return Array.prototype.concat.apply([], arr);
}

