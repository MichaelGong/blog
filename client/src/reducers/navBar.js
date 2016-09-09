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
    case 'BEGIN_UPDATE_CATEGORY': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'UPDATE_CATEGORY': {
      return {
        ...state,
        fetching: false,
        updateCategory: action.data
      };
    }
    case 'BEGIN_ADD_CATEGORY': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'ADD_CATEGORY': {
      return {
        ...state,
        fetching: false,
        addCategory: action.data
      };
    }
    case 'BEGIN_DELETE_CATEGORY': {
      return {
        ...state,
        fetching: true
      }
    }
    case 'DELETE_CATEGORY': {
      return {
        ...state,
        fetching: false,
        deleteCategory: action.data
      }
    }
    default:
      return state;
  }
}
