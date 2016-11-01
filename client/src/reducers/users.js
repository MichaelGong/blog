const CHECK_USERS_BEGIN = 'CHECK_USERS_BEGIN';
const CHECK_USERS_END = 'CHECK_USERS_END';
const CHECK_USERS_ERROR = 'CHECK_USERS_ERROR';

export default function(state = {}, action = {}) {
  switch (action.type) {
    case CHECK_USERS_BEGIN: {
      return {
        ...state,
        fetching: true
      };
    }
    case CHECK_USERS_END: {
      return {
        ...state,
        fetching: false,
        checkuser: action.data
      };
    }
    case CHECK_USERS_ERROR: {
      return {
        ...state,
        fetching: false,
        checkuser: action.data
      };
    }
    default:
      return state;
  }
}
