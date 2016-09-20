const GET_ARTICLE = 'GET_ARTICLE';
const BEGIN_GET_ARTICLE = 'BEGIN_GET_ARTICLE';
const GET_ARTICLE_DETAIL = 'GET_ARTICLE_DETAIL';
const BEGIN_DELETE_ARTICLE = 'BEGIN_DELETE_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';

export default function(state = { allArticles: [], articleDetail: {} }, action = {}) {
  switch (action.type) {
    case BEGIN_GET_ARTICLE: {
      return {
        ...state,
        fetching: true
      };
    }
    case GET_ARTICLE: {
      return {
        ...state,
        allArticles: action.data,
        fetching: false
      };
    }
    case GET_ARTICLE_DETAIL: {
      return {
        ...state,
        articleDetail: action.data,
        fetching: false
      };
    }
    case BEGIN_DELETE_ARTICLE: {
      return {
        ...state,
        fetching: true
      };
    }
    case DELETE_ARTICLE: {
      return {
        ...state,
        fetching: false,
        deleteArticle: action.data
      };
    }
    default:
      return state;
  }
}
