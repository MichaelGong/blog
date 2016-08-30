import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory }
  from 'react-router'; // hashHistory,browserHistory
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import NavBar from './components/navBar';
import ListApp from './components/list';
import Detail from './components/detail';
import './css/common.less';
import DevTool from './containers/devTools';
const store = configureStore();
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
      </Router>
      <DevTool />
    </div>
  </Provider>
), document.getElementById('app'));
