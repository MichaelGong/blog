import apis from '../api';

export function checkUser(data) {
  return dispatch => {
    dispatch({ type: 'CHECK_USERS_BEGIN' });
    return fetch(apis.checkUser, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).
    then(response => response.json()).
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
