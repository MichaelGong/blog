import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style';
import '../navBar.less';

class MenuDOM extends Component {
  render() {
    return (
      <div className="navbar navbar-fixed">
        <a className="navbar-logo"></a>
        <Menu
          theme="dark"
          style={{ width: 120 }}
          mode="inline"
        >
          <Menu.Item><Icon type="book" />基本信息</Menu.Item>
          <Menu.Item><Icon type="book" />类别管理</Menu.Item>
          <Menu.Item><Icon type="book" />标签管理</Menu.Item>
          <Menu.Item><Icon type="book" />文章管理</Menu.Item>
          <Menu.Item><Icon type="book" />来篇文章</Menu.Item>
        </Menu>

      </div>
    );
  }
}

export default MenuDOM;
