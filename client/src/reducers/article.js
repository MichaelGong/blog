const GET_ARTICLE = 'GET_ARTICLE';
const BEGIN_GET_ARTICLE = 'BEGIN_GET_ARTICLE';
const GET_ARTICLE_DETAIL = 'GET_ARTICLE_DETAIL';

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
    default:
      return state;
  }
}
