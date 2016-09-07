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

// 更新基本信息
export function updateInfo(data) {
  return dispatch => {
    dispatch({ type: 'BEGIN_UPDATE_INFO' });
    return fetch(apis.updateInfo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).
      then(json => {
        dispatch({ type: 'UPDATE_INFO', data: json });
      });
  };
}

// 重置updateInfo
export function resetUpdateInfo() {
  return dispatch => dispatch({ type: 'RESET_UPDATE_INFO' });
}

// 获取七牛uptoken
export function getUpToken() {
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_UPTOKEN' });
    return fetch(apis.getUpToken).then(response => response.json()).
      then(json => {
        dispatch({ type: 'GET_UPTOKEN', data: json.data });
      });
  };
}
// 设置filelist
export function setFileListAction(fileListArr) {
  return dispatch => dispatch({ type: 'SET_FILE_LIST', data: fileListArr });
}
