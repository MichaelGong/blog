import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory }
  from 'react-router'; // hashHistory,browserHistory
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import NavBar from './components/navBar';
import ListApp from './components/list';
import Detail from './components/detail';
import MenuDOM from './components/admin/menu';
import Login from './components/admin/login';
import Info from './components/admin/info';
import Category from './components/admin/category';
import Tag from './components/admin/tag';
import Article from './components/admin/article';
import Write from './components/admin/write';
import './css/common.less';
import DevTool from './containers/devTools';
const store = configureStore();
var ENV = process.env.NODE_ENV || 'development';
var isDev = ENV === 'development';
let devTool = '';
if (isDev) {
  devTool = <DevTool />;
}
// 配置路由
render((
  <Provider store={store}>
    <div>
      <Router history={browserHistory} >
        {/* 前段UI */}
        <Route path="/view" component={NavBar}>
          <IndexRoute component={ListApp} />
          <Route path="list(/:categoryid)(/:tagid)" component={ListApp} />
          <Route path="detail/:articleid" component={Detail} />
        </Route>
        {/* 管理后台 */}
        <Route path="/admin" component={MenuDOM}>
          <IndexRoute component={Info} />
          <Route path="login" component={Login} />
          <Route path="register" component={Login} />
          <Route path="info" component={Info} />
          <Route path="category" component={Category} />
          <Route path="tag" component={Tag} />
          <Route path="article" component={Article} />
          <Route path="write" component={Write} />
        </Route>
      </Router>
      {/* devTool */}
    </div>
  </Provider>
), document.getElementById('app'));
