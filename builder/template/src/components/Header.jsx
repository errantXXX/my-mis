import React, { Component, PropTypes } from 'react';
import { Row, Col, Spin, Icon, Form, Modal, Input, Menu, Dropdown } from 'antd';
import { connect } from 'dva';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

class Header extends Component {
  constructor(props) {
    super(props)
    this.initial = {
      changeUserInfoModal: false,
      changeUserInfo: {},
      password: '',
    };
    this.state = _.extend({}, this.initial);
  }
  logout() {
    this.props.dispatch({
      type: 'api/logout',
      payload: null,
    })
  }
  showChangeUserInfoModal = () => {
    this.setState({ changeUserInfoModal: true });
  }
  change(e) {
    this.setState({
      password: e.target.value,
    })
  }
  changeUserInfo = () => {
    String.prototype.trim = function () {
      return this.replace(/(^\s*)|(\s*$)/g, '');
    }
    const password = this.state.password && this.state.password.trim();
    if (password.length > 0) {
      const regu = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/;
      const reg = new RegExp(regu);
      if (reg.test(password)) {
        this.props.dispatch({
          type: 'api/post',
          payload: {
            url: 'user/resetMyPassword',
            name: 'reset',
            form: {password}
          },
          succCallback: (data) => {
            if (data.code === 0) {
              this.setState({ changeUserInfoModal: false });
              Modal.success({
                title: '密码修改',
                content: '密码修改成功',
                okText: '确定',
                onOk() {},
                onCancel() {},
              })
            } else if (data.code === 1 || data.code === 2) {
            } else if (data.code === 400) {
              Modal.error({
                title: '修改密码',
                content: `修改密码失败:${data.msg}`,
                okText: '确定',
                onOk() {},
                onCancel() {},
              })
            }
          },
        });
      } else {
        Modal.error({
          title: '修改密码失败',
          content: '错误提示：密码格式不正确，应包含字母数字符号，位数介于8-30之间！',
          okText: '确定',
          onOk() {},
          onCancel() {},
        })
      }
    } else {
      Modal.error({
        title: '修改密码失败',
        content: '错误提示：密码不能为空！',
        okText: '确定',
        onOk() {},
        onCancel() {},
      })
    }
  }
  hideModal = () => {
    this.setState({ changeUserInfoModal: false });
  }
  handleMenuClick(e) {
    const that = this;
    const info = function info() {
      Modal.info({
        title: '客服系统',
        content: (
          <div>
            <div style={{ display: 'block', marginBottom: 5, color: 'rgba(128,128,128,1)' }}>当前版本 : {require('../config').version}</div>
            <div style={{ display: 'block', marginBottom: 5, color: 'rgba(128,128,128,1)' }}>更新内容 : {require('../config').content}</div>
            <div style={{ display: 'block', marginBottom: 5, color: 'rgba(128,128,128,1)' }}>更新时间 : {require('../config').buildtime}</div>
            <div style={{ display: 'block', color: 'rgba(128,128,128,1)' }}>联系方式 : {require('../config').support}</div>
          </div>
        ),
        onOk() {},
      });
    }
    if (e.key === '1') {
      that.showChangeUserInfoModal();
    } else if (e.key === '2') {
      info();
    } else if (e.key === '3') {
      that.logout();
    }
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    }
    const {getFieldDecorator} = this.props.form;
    const styles = {
      textAlign: 'center',
      width: '100px',
      height: '100px',
      position: 'absolute',
      left: '200px',
      right: '0',
      margin: 'auto',
      top: '220px',
      zIndex: 999,
    };
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="1" style={{ color: 'rgba(128,128,128,0.9)' }}>
          <Icon type="user" style={{ fontSize: 18, marginRight: 7 }} />修改密码
        </Menu.Item>
        <Menu.Item key="2" style={{ color: 'rgba(128,128,128,0.9)' }}>
          <Icon type="code-o" style={{ fontSize: 18, marginRight: 7 }} />关于我们
        </Menu.Item>
        <Menu.Item key="3" style={{ color: 'rgba(128,128,128,0.9)' }}>
          <Icon type="poweroff" style={{ fontSize: 18, marginRight: 7 }} />退出系统
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{ padding: '0 10px', height: 65, paddingTop: 10, background: '#363942', color: 'rgba(128,128,128,0.7)', boxShadow: '0 1px 4px 0 rgba(38,39,42,0.50)' }}>
        <Row span={24} type="flex">
          <span className="main-logo"></span>
          <Col span={8}>
            <Row>
                <h2 style={{ display: 'inline-block', fontWeight: 'normal', marginLeft: 15, color: '#fff', fontFamily: 'PingFangSC-Semibold'}}>客服平台</h2>
            </Row>
            <Row>
                <div style={{ display: 'inline-block', fontWeight: 'normal', marginLeft: 15, fontSize: 12, color: '#fff', fontFamily: 'DIN Condensed'}}>Customer Service Platform</div>
            </Row>
          </Col>
          <Col span={14} style={{ textAlign: 'right', marginTop:15 }}>
            {this.props.phone ?
                <div>
                    <h4 style={{ display: 'inline-block', color: '#fff', marginRight: 2 }}>{this.props.name}</h4>
                    <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                        <Icon
                        type="caret-down" style={{ fontSize: 12, marginLeft: 3, color: '#fff' }}
                        />
                    </a>
                    </Dropdown>
                </div>
              :
                <div>
                    <h4 style={{ display: 'inline-block', color: '#fff', marginRight: 2 }}>请退出重新登录</h4>
                    <Dropdown overlay={menu} placement="bottomCenter">
                    <a className="ant-dropdown-link">
                        <Icon
                        type="caret-down" style={{ fontSize: 12, marginLeft: 5, color: '#fff' }}
                        />
                    </a>
                    </Dropdown>
                </div>
              }
          </Col>
          { this.props.loading && Object.keys(this.props.loading).length > 0 ?
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Spin size="large" style={styles} />
            </div> : null }
        </Row>
        <Modal
          title="修改密码"
          key={this.state.changeUserInfoModal}
          visible={this.state.changeUserInfoModal}
          onCancel={this.hideModal}
          onOk={this.changeUserInfo}
          maskClosable={false}
        >
          <Row style={{ marginBottom: 5 }}>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {getFieldDecorator('updatePassword', {
                initialValue: this.state.password,
                rules: [{
                  required: true, message: '密码不能为空!',
                }, {
                  type: 'string',
                  pattern: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/,
                  message: '密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符。',
                }],
              })(
                <Input
                  type="text" placeholder="请输入新密码" onChange={this.change.bind(this)}
                />
              )}
            </FormItem>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    loading: state.api.loading,
    phone: state.api.phone,
    name: state.api.name,
  }
})(Form.create()(Header));
