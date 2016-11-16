import * as actionTypes  from '../common/actionTypes';

export function login(payload) {
  return {
    type: actionTypes.LOGIN,
    payload
  };
}

export function verificationCode(payload) {
  return {
    type: actionTypes.VERIFICATION_CODE,
    payload
  };
}

export function register(payload) {
  return {
    type: actionTypes.REGISTER,
    payload
  };
}

export function logout(payload) {
  return {
    type: actionTypes.LOGOUT,
    payload
  };
}