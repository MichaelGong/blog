import apis from '../api';

export function tags() {
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_TAGS' });
    return fetch(apis.getTags).then(response => response.json()).
      then(json => {
        if (json.code === 200) {
          dispatch({ type: 'GET_TAGS', data: json.data });
        }
      });
  };
}
