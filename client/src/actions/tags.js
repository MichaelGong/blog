import apis from '../api';

// 获取所有标签
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
// 搜索标签
export function searchTags(tagsStr) {
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_TAGS' });
    return fetch(apis.searchTags + '?tags=' + tagsStr).then(response => response.json()).
      then(json => {
        if (json.code === 200) {
          dispatch({ type: 'SEARCH_TAGS', data: json.data });
        }
      });
  };
}
