import apis from '../api';
import { fetchPost } from '../util';

// 检查用户名密码是否合法
export function checkUserAction(data) {
  return dispatch => {
    dispatch({ type: 'CHECK_USERS_BEGIN' });
    return fetchPost(apis.checkUser, data).
    then(json => {
      dispatch({ type: 'CHECK_USERS_END', data: json });
    }).
    catch(error => {
      dispatch({
        type: 'CHECK_USERS_ERROR',
        data: {
          code: 500,
          message: '请求超时！',
          data: error
        }
      });
    });
  };
}
// 清空checkuser
export function emptyCheckuserAction() {
  return { type: 'CHECK_USERS_EMPTY', data: null };
}

// 注册用户
export function registerUserAction(data) {
  return dispatch => {
    dispatch({ type: 'REGISTER_USERS_BEGIN' });
    return fetchPost(apis.registerUser, data).
      then(json => {
        dispatch({ type: 'REGISTER_USERS_END', data: json });
      }).
      catch(error => {
        dispatch({
          type: 'REGISTER_USERS_ERROR',
          data: {
            code: 500,
            message: '请求超时！',
            data: error
          }
        });
      });
  };
}
// 清空注册用户返回值
export function emptyRegisterUserAction() {
  return { type: 'REGISTER_USERS_EMPTY', data: null };
}
