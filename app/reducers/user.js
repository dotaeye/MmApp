import * as actionTypes from '../common/actionTypes'
const initialState = {
  loaded: false
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case 'RESET_STATE':
      return {
        ...initialState
      };

    case actionTypes.REGISTER:
      return {
        ...state,
        registering: true
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false
      };

    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registerError: action.error
      };

    case actionTypes.LOGIN:
      return {
        ...state,
        loggingIn: true,
        loginError: null
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggingIn: false
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };

    case actionTypes.LOGOUT:
      return {
        ...state
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      };
    case actionTypes.LOGOUT_FAIL:
      return {
        ...state
      };

    case actionTypes.RESET_PASSWORD:
      return {
        ...state,
        loggingIn: true
      };

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loggingIn: false
      };

    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    default:
      return state;
  }
}

