import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, message } from 'antd';
import {
  checkUserAction,
  emptyCheckuserAction,
  registerUserAction,
  emptyRegisterUserAction
} from '../../../actions/users';
import { browserHistory } from 'react-router';
import './login.less';
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false
    };
    this.checkPassword = this.checkPassword.bind(this);
    this.checkRepeatPassword = this.checkRepeatPassword.bind(this);
  }
  componentDidUpdate() {
    const { checkuser, registerUser, dispatch } = this.props;
    if (checkuser) {
      if (checkuser.code === 200) {
        browserHistory.push('/admin/info');
      } else {
        message.error(checkuser.message);
      }
      dispatch(emptyCheckuserAction());
    }
    if (registerUser) {
      console.log(registerUser);
      if (registerUser.code === 200) {
        message.success('注册成功，请等待管理员审核！');
      } else {
        message.error(registerUser.message);
      }
      dispatch(emptyRegisterUserAction());
    }
  }
  // 设置是否是注册状态
  setRegister() {
    this.setState({
      isRegister: !this.state.isRegister
    });
  }
  // 检查password
  checkPassword(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value && this.state.isRegister) {
      validateFields(['repeatPassword'], { force: true });
    }
    callback();
  }
  // 检查重新输入密码
  checkRepeatPassword(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('userpassword')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  // 登录或者注册
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      if (!this.state.isRegister) {
        dispatch(checkUserAction(values));
      } else {
        dispatch(registerUserAction(values));
      }
    });
  }
  render() {
    const {
      getFieldProps,
      getFieldError
    } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const username = getFieldProps('username', {
      rules: [{
        required: true,
        whitespace: false,
        message: '请输入用户名'
      }]
    });
    const password = getFieldProps('userpassword', {
      rules: [{
        required: true,
        whitespace: false,
        message: '请输入密码'
      }, {
        validator: this.checkPassword
      }]
    });
    let repeatPassword;
    if (this.state.isRegister) {
      repeatPassword = getFieldProps('repeatPassword', {
        rules: [{
          required: true,
          whitespace: false,
          message: '请再次输入密码'
        }, {
          validator: this.checkRepeatPassword
        }]
      });
    }
    return (
      <div className="login-container">
        <Row className="wh-100">
          <Col
            xs={{ span: 20 }}
            sm={{ span: 15 }}
            md={{ span: 10 }}
            className="login-container-section"
          >
            <div className="login-container-desc">{this.state.isRegister ? '注册用户' : '用户登录'}</div>
            <Form
              horizontal
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <FormItem
                label="用户名"
                help={(getFieldError('username') || []).join(', ')}
                hasFeedback
                {...formItemLayout}
              >
                <Input {...username} placeholder="请输入用户名" />
              </FormItem>
              <FormItem
                label="密&nbsp;&nbsp;&nbsp;&nbsp;码"
                help={(getFieldError('userpassword') || []).join(', ')}
                {...formItemLayout}
              >
                <Input
                  type="password"
                  {...password}
                  placeholder="请输入密码"
                  onContextMenu={noop}
                  onPaste={noop}
                  onCopy={noop}
                  onCut={noop}
                />
              </FormItem>
              {
                this.state.isRegister ?
                  <FormItem
                    label="确认密码"
                    help={(getFieldError('repeatPassword') || []).join(', ')}
                    {...formItemLayout}
                  >
                    <Input
                      type="password"
                      {...repeatPassword}
                      placeholder="请输入密码"
                      onContextMenu={noop}
                      onPaste={noop}
                      onCopy={noop}
                      onCut={noop}
                    />
                  </FormItem> : ''
              }
              <FormItem
                wrapperCol={{ span: 14, offset: 6 }}
                style={{ marginTop: 24 }}
              >
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  确定
                </Button>
              </FormItem>
            </Form>
            <div style={{ textAlign: 'center' }}>
              <span
                className="cursor"
                onClick={() => this.setRegister()}
              >
                {this.state.isRegister ? '我要登录' : '我要注册'}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapToState(state) {
  return {
    checkuser: state.users.checkuser, // 检查用户名密码是否合法返回值
    registerUser: state.users.registerUser
  };
}
Login.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object.isRequired,
  route: PropTypes.object,
  checkuser: PropTypes.object,
  registerUser: PropTypes.object
};
export default connect(mapToState)(Form.create()(Login));

