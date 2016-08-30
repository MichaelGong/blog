const GET_TAGS = 'GET_TAGS';
const BEGIN_GET_TAGS = 'BEGIN_GET_TAGS';

export default function(state = { tags: [] }, action = {}) {
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
        fetching: true
      };
    }
    default:
      return state;
  }
}
