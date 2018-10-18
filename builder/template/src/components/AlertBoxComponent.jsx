import { Modal } from 'antd';

const AlertBox = module.exports;
module.exports = {};
/**
 * 操作成功后的提醒框
 */
AlertBox.ModSuccess = (title, content, onOk) => {
  Modal.success({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}
/**
 * 操作失败后的操作提醒框
 */
AlertBox.ModFail = (title, content, onOk) => {
  Modal.error({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content || '服务错误'}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}

/**
 * 确认操作以及进行下一步操作
 */

AlertBox.ModConfirm = (title, content, onOk) => {
  Modal.confirm({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    onOk,
    onCancel() { },
  });
}

/**
 * 信息提示
 */
AlertBox.ModInfo = (title, content, onOk) => {
  Modal.info({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}

/**
 * warning警告框，用于提示用户危险操作
 */
AlertBox.ModWarning = (title, content, onOk) => {
  Modal.warning({
    title,
    content: <div style={{ wordBreak: 'break-all' }}>{content}</div>,
    okText: '我知道了',
    onOk,
    onCancel() {
    },
  });
}
