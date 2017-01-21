import {put, take, call, fork} from 'redux-saga/effects';
import {Toast} from 'antd-mobile';
import * as actionTypes from '../common/actionTypes'
import config from '../common/config';
import Request from '../utils/Request';
import Storage from '../utils/Storage';

function* login(payload) {
  try {
    const token = yield call(new Request().post, 'account/login', {
      data: {
        username: payload.telephone,
        password: payload.loginPassword,
        grant_type: 'password',
        type: 'password'
      },
      login: true
    });
    yield call(Storage.save, config.token, token);
    yield put({
      type: actionTypes.LOGIN_SUCCESS,
      user: token
    });

    if (payload.success) {
      yield call(payload.success);
    }

  } catch (error) {
    yield put({
      type: actionTypes.LOGIN_FAIL
    });
    if (error && error.message !== '') {
      Toast.info(error.message)
    }
  }
}

function* register(payload) {
  try {
    yield call(new Request().post, 'account/register', {
      data: {
        email: payload.telephone,
        password: payload.loginPassword,
        smsCode: payload.telVerifyCode,
        refPhone: payload.refPhone
      },
      formJson: true
    });
    yield call(login, payload);
    yield put({
      type: actionTypes.REGISTER_SUCCESS
    });
    if (payload.success) {
      yield call(payload.success);
    }

  } catch (error) {
    yield put({
      type: actionTypes.REGISTER_FAIL
    });
    if (error && error.message !== '') {
      Toast.info(error.message)
    }
  }
}

function* resetPassword(payload) {
  try {
    yield call(new Request().post, 'account/setpassword', {
      data: {
        userName: payload.telephone,
        newPassword: payload.loginPassword,
        smsCode: payload.telVerifyCode
      },
      formJson: true
    });
    yield call(login, payload);
    yield put({
      type: actionTypes.RESET_PASSWORD_SUCCESS
    });
    if (payload.success) {
      yield call(payload.success);
    }

  } catch (error) {
    yield put({
      type: actionTypes.RESET_PASSWORD_FAIL
    });
    if (error && error.message !== '') {
      Toast.info(error.message)
    }
  }
}


function* verificationCode(data) {
  try {
    yield call(new Request().post, 'account/smscode', {
      data,
      formJson: true,
      formString: true
    });
  } catch (error) {
    if (error && typeof error.message == 'string') {
      Toast.info(error.message)
    }
  }
}

function* logout(payload) {
  try {
    yield call(Storage.delete, config.token);
    yield put({
      type: actionTypes.LOGOUT_SUCCESS
    });
    yield put({
      type: 'RESET_STATE'
    });
    if (payload.success) {
      yield call(payload.success);
    }
  } catch (error) {
    yield put({
      type: actionTypes.LOGOUT_FAIL
    });
    if (error && typeof error.message == 'string') {
      Toast.info(error.message)
    }
  }
}

export function* watchLoginFlow() {
  while (true) {
    const {payload} = yield take(actionTypes.LOGIN);
    yield fork(login, payload);
  }
}

export function* watchRegisterFlow() {
  while (true) {
    const {payload} = yield take(actionTypes.REGISTER);
    yield fork(register, payload);
  }
}

export function* watchVerificationCodeFlow() {
  while (true) {
    const {payload} = yield take(actionTypes.VERIFICATION_CODE);
    yield fork(verificationCode, payload);
  }
}

export function* watchLogoutFlow() {
  while (true) {
    const {payload} = yield take(actionTypes.LOGOUT);
    yield fork(logout, payload);
  }
}

export function* watchResetPasswordFlow() {
  while (true) {
    const {payload} = yield take(actionTypes.RESET_PASSWORD);
    yield fork(resetPassword, payload);
  }
}

