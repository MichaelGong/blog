const CHECK_USERS_BEGIN = 'CHECK_USERS_BEGIN';
const CHECK_USERS_END = 'CHECK_USERS_END';
const CHECK_USERS_ERROR = 'CHECK_USERS_ERROR';
const CHECK_USERS_EMPTY = 'CHECK_USERS_EMPTY';

const REGISTER_USERS_BEGIN = 'REGISTER_USERS_BEGIN';
const REGISTER_USERS_END = 'REGISTER_USERS_END';
const REGISTER_USERS_ERROR = 'REGISTER_USERS_ERROR';
const REGISTER_USERS_EMPTY = 'REGISTER_USERS_EMPTY';


export default function(state = {}, action = {}) {
  switch (action.type) {
    case CHECK_USERS_BEGIN: {
      return {
        ...state,
        fetching: true
      };
    }
    case CHECK_USERS_END:
    case CHECK_USERS_ERROR:
    case CHECK_USERS_EMPTY: {
      return {
        ...state,
        fetching: false,
        checkuser: action.data
      };
    }
    case REGISTER_USERS_BEGIN: {
      return {
        ...state,
        fetching: true
      };
    }
    case REGISTER_USERS_END: {
      return {
        ...state,
        fetching: false,
        registerUser: action.data
      };
    }
    case REGISTER_USERS_ERROR: {
      return {
        ...state,
        fetching: false,
        registerUser: action.data
      };
    }
    case REGISTER_USERS_EMPTY: {
      return {
        ...state,
        fetching: false,
        registerUser: action.data
      };
    }
    default:
      return state;
  }
}
