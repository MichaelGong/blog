import apis from '../api';
import { fetchGet, fetchPost } from '../util';

// 获取文章
export function articleAllAction(categoryid, tagid) {
  var url = apis.getAllArticles;
  if (tagid || categoryid) {
    url = apis.getAllArticles + '?categoryid=' +
      (categoryid === 'all' ? '' : categoryid) + '&tagid=' + tagid;
  }
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_ARTICLE' });
    return fetchGet(url).then(json => {
      if (json.code === 200) {
        dispatch({ type: 'GET_ARTICLE', data: json.data });
      }
    });
  };
}
// 获取文章详情
export function getArticleByIdAction(articleId) {
  var url = apis.getArticleById + '?id=' + articleId;
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_ARTICLE' });
    return fetchGet(url).then(json => {
      if (json.code === 200) {
        dispatch({ type: 'GET_ARTICLE_DETAIL', data: json.data });
      }
    });
  };
}
// 清空 DELETE_ARTICLE
export function emptyGetArticleByIdAction() {
  return { type: 'GET_ARTICLE_DETAIL', data: null };
}
// 根据id删除文章
export function deleteArticleByIdAction(articleId) {
  return dispatch => {
    dispatch({ type: 'BEGIN_DELETE_ARTICLE' });
    return fetchPost(apis.deleteArticleById, {
      idArr: articleId
    }).
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
  return { type: 'DELETE_ARTICLE', data: null };
}
// 提交文章内容
export function saveArticleAction(data) {
  return dispatch => {
    dispatch({ type: 'SAVE_ARTICLE_BEGIN' });
    return fetchPost(apis.saveArticle, {
      title: data.title,
      content: data.content,
      tags: data.tags,
      categoryId: data.categoryId,
      categoryName: data.categoryName
    }).
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
// 更新文章
export function updateArticleAction(data) {
  return dispatch => {
    dispatch({ type: 'UPDATE_ARTICLE_BEGIN' });
    return fetchPost(apis.updateArticle, data).
      then(json => {
        dispatch({ type: 'UPDATE_ARTICLE_END', data: json });
      }).
      catch(() => {
        dispatch({
          type: 'UPDATE_ARTICLE_ERROR',
          data: {
            code: 500,
            message: '请求失败！'
          }
        });
      });
  };
}

// 清空 UPDATE_ARTICLE_END
export function emptyUpdateArticleAction() {
  return ({ type: 'UPDATE_ARTICLE_EMPTY', data: null });
}

