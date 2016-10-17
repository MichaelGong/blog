const GET_TAGS = 'GET_TAGS';
const BEGIN_GET_TAGS = 'BEGIN_GET_TAGS';
const SEARCH_TAGS = 'SEARCH_TAGS';

export default function(state = { tags: [], searchTags: [] }, action = {}) {
  switch (action.type) {
    case GET_TAGS: {
      return {
        ...state,
        tags: action.data,
        fetching: false
      };
    }
    case BEGIN_GET_TAGS: {
      return {
        ...state,
        fetching: true,
        searchTags: []
      };
    }
    case SEARCH_TAGS: {
      return {
        ...state,
        fetching: false,
        searchTags: action.data
      };
    }
    default:
      return state;
  }
}
