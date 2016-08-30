const GET_TAGS = 'GET_TAGS';
const GET_CATEGORY = 'GET_CATEGORY';
const BEGIN_GET_CATEGORY = 'BEGIN_GET_CATEGORY';
export default function(state = { tags: [], category: {} }, action = {}) {
  switch (action.type) {
    case GET_TAGS: {
      return Object.assign({}, state, {
        tags: ['哈哈', '你不懂', '你好厉害']
      });
    }
    case GET_CATEGORY: {
      return {
        ...state,
        category: action.data ? action.data : {},
        fetching: false
      };
    }
    case BEGIN_GET_CATEGORY: {
      return Object.assign({}, state, {
        fetching: true
      });
    }
    default:
      return state;
  }
}
