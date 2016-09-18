import apis from '../api';
// 获取文章
export function articleAllAction(categoryid, tagid) {
  var url = apis.getAllArticles;
  if (tagid || categoryid) {
    url = apis.getAllArticles + '?categoryid=' +
      (categoryid === 'all' ? '' : categoryid) + '&tagid=' + tagid;
  }
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_ARTICLE' });
    return fetch(url).then(response => response.json()).
      then(json => {
        if (json.code === 200) {
          dispatch({ type: 'GET_ARTICLE', data: json.data });
        }
      });
  };
}
// 获取文章详情
export function getArticleById(articleId) {
  var url = apis.getArticleById + '?id=' + articleId;

  return dispatch => {
    dispatch({ type: 'BEGIN_GET_ARTICLE' });
    return fetch(url).then(response => response.json()).
      then(json => {
        if (json.code === 200) {
          dispatch({ type: 'GET_ARTICLE_DETAIL', data: json.data });
        }
      });
  };
}
