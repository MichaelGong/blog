import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

import '../navBar.less';
import './admin.less';
const SubMenu = Menu.SubMenu;
class MenuDOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'info',
      menuKeys: ['info', 'category', 'tag', 'article', 'write']
    };
  }
  componentWillMount() {
    // 设置左侧menu item激活
    const { location } = this.props;
    const pathName = location.pathname;
    let pathNameArr = pathName.substr(1).split('/');
    let current = pathNameArr[pathNameArr.length - 1];
    // 如果左侧的包含就显示某一个menu item，默认是info
    this.setState({
      current: this.state.menuKeys.indexOf(current) > -1 ? current : 'info'
    });
  }
  // 点击菜单
  handleClick(e) {
    console.log(e);
    if (this.state.menuKeys.indexOf(e.key) < 0) return; // 头像点击没有反应
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-fixed" style={{ background: '#fff' }}>
          <Menu
            onClick={(e) => this.handleClick(e)}
            defaultOpenKeys={[this.state.current]}
            selectedKeys={[this.state.current]}
            style={{ width: 120, height: '100%', paddingTop: 20 }}
            mode="inline"
          >
            <Menu.Item style={{ height: 100 }}>
              <a className="navbar-logo" style={{ marginTop: '20px' }}></a>
            </Menu.Item>
            <Menu.Item key="info">
              <Link to="/view/admin/info"><Icon type="solution" />基本信息</Link>
            </Menu.Item>
            <Menu.Item key="category">
              <Link to="/view/admin/category"><Icon type="appstore" />类别管理</Link>
            </Menu.Item>
            <Menu.Item key="tag">
              <Link to="/view/admin/info"><Icon type="tags" />标签管理</Link>
            </Menu.Item>
            <Menu.Item key="article">
              <Link to="/view/admin/info"><Icon type="file-text" />文章管理</Link>
            </Menu.Item>
            <Menu.Item key="write">
              <Link to="/view/admin/info">
                <Icon type="code" />
                来篇文章
              </Link>
            </Menu.Item>
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
  children: PropTypes.object,
  location: PropTypes.object
};

export default MenuDOM;
