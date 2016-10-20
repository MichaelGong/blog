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
export function searchTagsAction(tagsStr) {
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
// 添加标签
export function addTagsAction(tagsNameArr) {
  return dispatch => {
    dispatch({ type: 'ADD_TAGS_BEGIN' });
    return fetch(apis.addTags, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: tagsNameArr
      })
    }).then(response => response.json())
    .then(json => {
      dispatch({ type: 'ADD_TAGS_END', data: json });
    }).
    catch(json => {
      dispatch({ type: 'ADD_TAGS_END', data: json });
    });
  };
}
// 清空addTags
export function emptyAddTagsAction() {
  return dispatch => dispatch({ type: 'ADD_TAGS_END', data: null });
}
