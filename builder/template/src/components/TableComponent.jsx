import React from 'react';
import styles from '../styles/common.less';

const TableComponent = module.exports = {}

TableComponent.TabColumns = (lib, flag, func) => {
  const co = lib.map((c, idx) => {
    return {
      key: idx,
      title: <span className={styles.commonTable} >{c.name}</span>,
      dataIndex: c.dataIndex,
      render: flag === true ? (text => <span className={styles.commonTable} >{text}</span>) : (func),
      width: c.width,
    }
  });
  return co;
}

TableComponent.TabPrint = (lib) => {
  const co = lib.map((c, idx) => {
    return {
      key: idx,
      title: <span className={styles.commonTable} style={{ fontSize: 12 }}>{c.name}</span>,
      dataIndex: c.dataIndex,
      render: text => <span className={styles.commonTable} style={{ fontSize: 12 }}>{text}</span>,
      width: c.width,
    }
  });
  return co;
}

TableComponent.TabPagination = (total) => {
  return {
    total,
    pageSize: 50,
    size: 'big',
    onShowSizeChange: (current, pageSize) => {
    },
    showTotal: (total, range) => `${range[0]}-${range[1]} 条 共 ${total} 条`,
    onChange: (current) => {
    },
  }
}

TableComponent.TabPaginations = (total) => {
  return {
    total,
    pageSize: 50,
    size: 'big',
    showTotal: (total, range) => `${range[0]}-${range[1]} 条 共 ${total} 条`,
    onShowSizeChange: (current, pageSize) => {
    },
    onChange: (current) => {
    },
  }
}

TableComponent.TabPaginationTotal = (total) => {
  return {
    total,
    pageSize: 51,
    size: 'big',
    showTotal: (total, range) => `${range[0]}-${range[1]} 条 共 ${total} 条`,
    onShowSizeChange: (current, pageSize) => {
    },
    onChange: (current) => {
    },
  }
}

TableComponent.TabPaginationBtn = (total, current) => {
  return {
    current,
    total,
    size: 'big',
    pageSize: 50,
    showTotal: (total, range) => `${range[0]}-${range[1]} 条 共 ${total} 条`,
    onShowSizeChange: (current, pageSize) => {
    },
    onChange: (current) => {
    },
  }
}

TableComponent.BtnArry = (item, func) => item.map((i, idx) => {
  return (
    <span className={styles.commonBtn} key={idx}>
      { i === '' ? null :
      <Button size="small" type={idx % 2 !== 0 ? 'primary' : ''} style={{ marginRight: 5 }} onClick={func[idx]}>
        {i}
      </Button>}
    </span>
  )
});

TableComponent.LinkArry = (item, func) => item.map((i, idx) => {
  return (
    <span className={styles.commonBtn} key={idx}>
      { i === '' ? null :
      <span className={styles.aLink} onClick={func[idx]}>
        {i}
      </span>}
    </span>
  )
})
