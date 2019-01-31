/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link ,withRouter} from 'react-router-dom';
import { Input, Button, Checkbox, Grid ,Message} from '@alifd/next';
import DataBinder from '@icedesign/data-binder';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';

const { Row, Col } = Grid;
@DataBinder({
  'login': {
    url: '/lyapi/login',
    method: 'post',
    data: { },
    defaultBindingData: {

    }
  }
})
@withRouter
export default class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log('values:', values);
      this.props.updateBindingData('login',{data:values},(res)=>{
        if(res.errorCode==0){
          Message.success('登录成功');
          this.props.history.push('/home');
        }else{
          Message.error(res.errorDetail);
        }
        
        // 登录成功后做对应的逻辑处理
      });
    });
  };

  render() {
    return (
      <div className="user-login">
        <div className="formContainer">
          <h4 className="formTitle">登 录</h4>
          <IceFormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
            ref="form"
          >
            <div className="formItems">
              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="person" size="small" className="inputIcon" />
                  <IceFormBinder name="name" required message="必填">
                    <Input size="large" maxLength={20} placeholder="用户名" />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="name" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col className="formItemCol">
                  <IceIcon type="lock" size="small" className="inputIcon" />
                  <IceFormBinder name="password" required message="必填">
                    <Input
                      size="large"
                      htmlType="password"
                      placeholder="密码"
                    />
                  </IceFormBinder>
                </Col>
                <Col>
                  <IceFormError name="password" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col>
                  <IceFormBinder name="checkbox">
                    <Checkbox className="checkbox">记住账号</Checkbox>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row className="formItem">
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                  className="submitBtn"
                >
                  登 录
                </Button>
              </Row>

              <Row className="tips">
                <Link to="/register" className="tips-text">
                  立即注册
                </Link>
                <span className="line">|</span>
                <Link to="/forgetpassword" className="tips-text">
                  忘记密码
                </Link>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </div>
      </div>
    );
  }
}
