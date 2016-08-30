const GET_INFO = 'GET_INFO';
const BEGIN_GET_INFO = 'BEGIN_GET_INFO';

export default function(state = { info: {} }, action = {}) {
  switch (action.type) {
    case GET_INFO: {
      return {
        ...state,
        info: action.data
      };
    }
    case BEGIN_GET_INFO: {
      return Object.assign({}, state, {
        fetching: true
      });
    }
    default:
      return state;
  }
}
