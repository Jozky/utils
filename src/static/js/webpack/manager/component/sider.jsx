var React = require("react");
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

const Sider = React.createClass({
  getInitialState() {
    return {
      theme: 'dark',
      current: '#/',
    };
  },
  handleClick(e) {
    
    this.setState({
      current: e.key,
    });
    window.location.href = e.key;
  },
  render() {
    return (
      <div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>博客管理</span></span>}>
            <Menu.Item key="#/article/add">编写文章</Menu.Item>
            <Menu.Item key="#/article/list">文章列表</Menu.Item>
            <Menu.Item key="#/2">Option 3</Menu.Item>
            <Menu.Item key="#/3">Option 4</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  },
});

module.exports = Sider;