import {put, take, call, fork} from 'redux-saga/effects';
import * as actionTypes from '../common/actionTypes'
import Request from '../utils/Request';
import FakeRequest from '../utils/FakeRequest';
import {Toast} from 'antd-mobile';


function* login(payload) {
  try {
    //const token = yield call(request, 'POST', 'user/login', data);
    const token = yield call(FakeRequest, {}, 2000);
    if(payload.success){
      yield call(payload.success);
    }

  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message)
    }
  }
}

function* register(payload) {
  try {
    //const token = yield call(request, 'POST', 'user/login', data);
    const token = yield call(FakeRequest, {}, 2000);
    if(payload.success){
      yield call(payload.success);
    }

  } catch (error) {
    if (error && error.message !== '') {
      Toast.info(error.message)
    }
  }
}


function* verificationCode(data) {
  try {
    yield call(FakeRequest, {}, 2000);
    // yield call(request, 'POST', 'user/verification', data);
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

