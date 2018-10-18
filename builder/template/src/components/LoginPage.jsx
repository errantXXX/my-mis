import React, {Component, PropTypes} from 'react';
import {connect} from 'dva';
import {Row, Col, Form, Input, Button, Icon, Alert, Modal, message} from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'dva/router';
import classnames from 'classnames/bind';
import styles from './LoginPage.less';
import Base from '../utils/base';


const FormItem = Form.Item;

class LoginPageBase extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      checkToken: '',
      isGetCode: false,
      isShowCodeBtn: false,
      message: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const form = this.props.form.getFieldsValue();
      let succCallback = (data) => {
        if (data.code !== 200) {
          if (data.code == 401) {
            this.setState({checkToken: data.data.checkToken, isShowCodeBtn: true, message: data.msg});
          }
          else if (data.code == 402) {
            this.setState({isGetCode: true});
            message.info(<span style={{color: 'red'}}>验证码已发送, 请输入验证码！</span>, 3);
          }
          else {
            Base.ModFail('登录失败', data.msg);
            this.setState({message: data.msg});
          }
        }
      };
      this.props.dispatch({type: 'api/login', payload: form, succCallback});
    })
  }

  getCodeBtnHandleClick = () => {
    this.props.dispatch({
      type: 'api/post',
      payload: {
        url: 'user/getCode',
        name: 'getCode',
        form: {checkToken: this.state.checkToken},
      },
      succCallback: (data) => {
        if (data.code == 200) {
          this.setState({isShowCodeBtn: false, isGetCode: true, message: '', checkToken: ''});
          Modal.success({title: '短信发送成功', content: '请查看手机，输入验证重新登陆！'});
        } else {
          Modal.error({title: '短信发送失败', content: data.msg});
        }
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {checkToken, isShowCodeBtn, isGetCode, message} = this.state;

    return (
      <Row type="flex" justify="center" align="middle" style={{height: '100vh'}}>
        <div className={classnames.bind(styles)({form: true, loginMsgError: message && isGetCode})}>
          <div className={styles.logo}>
            <img alt={'logo'} src="http://scm-test.int.ofo.com/favicon.ico"/>
            <span>客服平台</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input size="large" onPressEnter={this.handleSubmit} placeholder="mobile"/>)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input size="large" type="password" onPressEnter={this.handleSubmit} placeholder="password"/>)}
            </FormItem>
            {
              isGetCode ?
                <FormItem label="验证码" labelCol={{span: 6}} wrapperCol={{span: 17, offset: 1}}>
                  {getFieldDecorator('verify', {
                    rules: [{required: true, message: '请输入验证码'}],
                  })(
                    <Input placeholder="请输入验证码" style={{width: '100%'}}/>
                  )}
                </FormItem> : null
            }
            {
              message === '' ? <Alert message={message} style={{marginBottom: 0}} type="error" showIcon/> : null
            }
            {
              !isShowCodeBtn ?
                <FormItem>
                  <Button type="primary" size="large" style={{backgroundColor: '#0099FF'}} onClick={this.handleSubmit}>
                    Sign in
                  </Button>
                </FormItem> :
                <FormItem>
                  <Button type="primary"
                          onClick={this.getCodeBtnHandleClick.bind(this, checkToken)}
                          style={{
                            width: '100%',
                            backgroundColor: 'rgb(33, 185, 187)',
                            borderColor: 'rgb(33, 185, 187)',
                          }}
                  >获取验证码</Button>
                </FormItem>
            }
          </form>
        </div>
      </Row>
    );
  }

}

const LoginPage = Form.create()(LoginPageBase);

function mapStateToProps(state) {
  return {
    message: state.api.message,
    data: state.api.data,
  }
}

export default connect(mapStateToProps)(LoginPage);
