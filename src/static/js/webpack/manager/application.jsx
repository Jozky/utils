var React = require("react");
var RouterDom = require('react-dom');
var less = require('./application.less');
var ngCss = require('../../../css/nprogress/nprogress.css');
var antCss = require('../../../css/antd/antd.min.css');
import {Icon, message, Popconfirm} from 'antd';

var Sider = require('./component/sider.jsx');
var indexService = require('../../service/index.js');

var Application = React.createClass({
  logout: function(){
    indexService.logout().then(function(res){
      if(res.status == 0){
        window.location.href = '/login';
      }else{
        message.info(res.msg);
      }
    })
  },
  confirm:  function() {
    this.logout();
  },
  cancel: function() {
  },
  render: function () {
    var location = this.props.location;
    var children = this.props.children;
    return (
      <div className="app">
        <div className="ant-layout-aside">
          <aside className="ant-layout-sider">
            <div className="ant-layout-logo">Hi~ {window.user.username}</div>
            <Sider />
          </aside>
          <div className="ant-layout-main">
            <div className="ant-layout-header">
              <div className="logout">
                <Popconfirm title="退出登录?" onConfirm={this.confirm} onCancel={this.cancel} okText="Yes" cancelText="No">
                  <Icon type="logout" />
                </Popconfirm>
              </div>
            </div>
            <div className="ant-layout-container">
              <div className="ant-layout-content">
                <div style={{ height: 590 }}>
                  {children}
                </div>
              </div>
            </div>
            <div className="ant-layout-footer">
            系统 版权所有 © 2017 由vicky个人技术提供支持
            </div>
          </div>
        </div>
      </div>
        
    );
  }
});

module.exports = Application;
