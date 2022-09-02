import { put, takeLatest, call } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Keychain from 'react-native-keychain' 
import _ from 'lodash'
import {
  LogIn,
  loginSuccess,
  loginStart,
  loginFail,
  logOut,
  GetNewToken
} from './slice'
import { Alert } from 'react-native'
import { setLoading } from '../Loading/slice'
import { signIn } from '../../services/signup.service'


function* LoginAsync(actions: PayloadAction<any>): Generator<any, any, any> {
  const { email, password } = actions.payload
  try {
    yield put(loginStart())
    yield put(setLoading(true))
    const result = yield call(signIn, { email, password }) 
    if (result.status) {
      yield Keychain.setGenericPassword(email, password)
      yield Keychain.setGenericPassword(email, result.data.tokens.access.token, {
        service: 'accessToken',
      })
      yield Keychain.setGenericPassword(email, result.data.tokens.refresh.token, {
        service: 'refreshToken',
      })
      yield put(loginSuccess(result.data))  
    } else { 
      yield put(loginFail({ messageError: result.message, code: result.code }))
    }
    yield put(setLoading(false))
  } catch (error) {
      console.log("error", error)
    Alert.alert('Thông báo', 'Đã có lỗi xảy ra.Vui lòng thử lại!')
  }
}

function* LogoutAsync(): Generator<any, any, any> {
  Keychain.resetGenericPassword()
  Keychain.resetGenericPassword({ service: 'accessToken' })
  Keychain.resetGenericPassword({ service: 'refreshToken' })
  Keychain.resetGenericPassword({ service: 'pinCode' }) 
}



export default function* watchAuthAsync() {
  yield takeLatest(logOut.type, LogoutAsync)
  yield takeLatest(LogIn.type, LoginAsync) 
}
