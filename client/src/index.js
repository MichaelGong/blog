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
        <Route path="/view" component={NavBar}>
          <IndexRoute component={ListApp} />
          <Route path="/view/list(/:categoryid)(/:tagid)" component={ListApp} />
          <Route path="/view/detail/:articleid" component={Detail} />
        </Route>
        <Route path="/view/admin" component={MenuDOM}>
          <IndexRoute component={MenuDOM} />
        </Route>
      </Router>
      {devTool}
    </div>
  </Provider>
), document.getElementById('app'));
