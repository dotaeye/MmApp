import * as actionTypes from '../common/actionTypes'
const initialState = {
  loaded: false
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.REGISTER:
      return {
        ...state,
        registering: true
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
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
        ...state,
        user: null
      };

    default:
      return state;
  }
}

