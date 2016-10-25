const GET_ARTICLE = 'GET_ARTICLE';
const BEGIN_GET_ARTICLE = 'BEGIN_GET_ARTICLE';
const GET_ARTICLE_DETAIL = 'GET_ARTICLE_DETAIL';
const BEGIN_DELETE_ARTICLE = 'BEGIN_DELETE_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';
const SAVE_ARTICLE_BEGIN = 'SAVE_ARTICLE_BEGIN';
const SAVE_ARTICLE_SUCCESS = 'SAVE_ARTICLE_SUCCESS';
const SAVE_ARTICLE_ERROR = 'SAVE_ARTICLE_ERROR';

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
    case SAVE_ARTICLE_BEGIN: {
      return {
        ...state,
        fetching: true
      };
    }
    case SAVE_ARTICLE_SUCCESS: {
      return {
        ...state,
        fetching: false,
        saveArticle: action.data
      };
    }
    case SAVE_ARTICLE_ERROR: {
      return {
        ...state,
        fetching: true,
        saveArticle: action.data
      };
    }
    default:
      return state;
  }
}
