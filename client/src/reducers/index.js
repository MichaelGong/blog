/**
 * 定义如何更新state
 */
import { combineReducers } from 'redux';
import navBar from './navBar';
import info from './info';
import tags from './tags';
import article from './article';
import users from './users';
const rootReducer = combineReducers({
  navBar,
  info,
  tags,
  article,
  users
});

export default rootReducer;
