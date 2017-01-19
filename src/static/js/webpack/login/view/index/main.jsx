var React = require('react');
var less = require('./main.less');
var Select = require('../../component/select/main.jsx');
var indexService = require('../../../../service/index.js');
var antCss = require('../../../../../css/antd/antd.min.css');

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        indexService.login(values).then(function(res){
          if(res.status == 0){
            window.location.href = '/manager'
          }else{
            message.info(res.msg)
          }
        })
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="index">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot">Forgot password</a>
            <br/>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <a className="hide">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  },
}));


module.exports = NormalLoginForm;