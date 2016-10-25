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
// 根据id删除文章
export function deleteArticleByIdAction(articleId) {
  return dispatch => {
    dispatch({ type: 'BEGIN_DELETE_ARTICLE' });
    return fetch(apis.deleteArticleById, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idArr: articleId
      })
    }).
    then(response => response.json()).
    then(json => {
      dispatch({ type: 'DELETE_ARTICLE', data: json });
    }).
    catch(json => {
      dispatch({ type: 'DELETE_ARTICLE', data: json });
    });
  };
}
// 清空 DELETE_ARTICLE
export function emptyDeleteArticleByIdAction() {
  return dispatch => dispatch({ type: 'DELETE_ARTICLE', data: null });
}
// 提交文章内容
export function saveArticleAction(data) {
  return dispatch => {
    dispatch({ type: 'SAVE_ARTICLE_BEGIN' });
    return fetch(apis.saveArticle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        tags: data.tags,
        categoryId: data.categoryId,
        categoryName: data.categoryName
      })
    }).then(response => response.json()).
    then(json => {
      dispatch({ type: 'SAVE_ARTICLE_SUCCESS', data: json });
    }).
    catch(() => {
      dispatch({
        type: 'SAVE_ARTICLE_ERROR',
        data: {
          code: 500,
          message: '请求失败！'
        }
      });
    });
  };
}
// 清空 SAVE_ARTICLE_SUCCESS
export function emptySaveArticleAction() {
  return dispatch => dispatch({ type: 'SAVE_ARTICLE_SUCCESS', data: null });
}
