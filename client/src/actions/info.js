import apis from '../api';
// 获取基本信息
export function info() {
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_INFO' });
    return fetch(apis.getInfo).then(response => response.json()).
      then(json => {
        dispatch({ type: 'GET_INFO', data: json.data });
      });
  };
}
