import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';

import '../navBar.less';
import './admin.less';
const SubMenu = Menu.SubMenu;
class MenuDOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'info'
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if (!e.key) return;
    this.setState({
      current: e.key
    });
    window.location.href = '/view';
  }
  render() {
    return (
      <div>
        <div className="navbar navbar-fixed" style={{ background: '#fff' }}>
          <Menu
            onClick={(e) => this.handleClick(e)}
            defaultOpenKeys={['info']}
            selectedKeys={[this.state.current]}
            style={{ width: 120, height: '100%', paddingTop: 20 }}
            mode="inline"
          >
            <Menu.Item style={{ height: '100px' }}>
              <a className="navbar-logo" style={{ marginTop: '20px' }}></a>
            </Menu.Item>
            <Menu.Item key="info"><Icon type="solution" />基本信息</Menu.Item>
            <Menu.Item key="category"><Icon type="appstore" />类别管理</Menu.Item>
            <Menu.Item key="tag"><Icon type="tags" />标签管理</Menu.Item>
            <Menu.Item key="article"><Icon type="file-text" />文章管理</Menu.Item>
            <Menu.Item key="write"><Icon type="code" />来篇文章</Menu.Item>
          </Menu>

        </div>
        <div className="admin-right-container">
          <Menu mode="horizontal">
            <SubMenu title={<span><Icon type="user" /> 哈哈 </span>}>
              <Menu.Item key="setting:1">退出</Menu.Item>
            </SubMenu>
          </Menu>
          <div className="admin-right-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
MenuDOM.propTypes = {
  children: PropTypes.object
};

export default MenuDOM;
