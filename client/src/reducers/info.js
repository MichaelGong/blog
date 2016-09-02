const GET_INFO = 'GET_INFO';
const BEGIN_GET_INFO = 'BEGIN_GET_INFO';
const GET_UPTOKEN = 'GET_UPTOKEN';
const BEGIN_GET_UPTOKEN = 'BEGIN_GET_UPTOKEN';
const UPDATE_INFO = 'UPDATE_INFO';
const BEGIN_UPDATE_INFO = 'BEGIN_UPDATE_INFO';

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
    case BEGIN_GET_UPTOKEN: {
      return {
        ...state,
        fetching: true
      };
    }
    case GET_UPTOKEN: {
      return {
        ...state,
        uptoken: action.data.uptoken
      };
    }
    case UPDATE_INFO: {
      return {
        ...state,
        updateInfo: action.data
      };
    }
    case BEGIN_UPDATE_INFO: {
      return {
        ...state,
        fetching: true
      };
    }
    default:
      return state;
  }
}
