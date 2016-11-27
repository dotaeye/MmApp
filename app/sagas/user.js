import {put, take, call, fork} from 'redux-saga/effects';
import * as actionTypes from '../common/actionTypes'
import config from '../common/config';
import Request from '../utils/Request';
import Storage from '../utils/Storage';
import {Toast} from 'antd-mobile';


function* login(payload) {
  try {
    const token = yield call(new Request().post, 'account/login', {
      data: {
        username: payload.telephone,
        password: payload.loginPassword,
        grant_type: 'password'
      },
      login: true
    });
    Storage.save(config.token, token);
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
        smsCode: payload.telVerifyCode
      },
      formJson: true
    });
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

