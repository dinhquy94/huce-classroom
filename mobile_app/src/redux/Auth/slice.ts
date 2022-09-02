import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const initialState = {
  isLoggedIn: false,
  is_first_time: false,
  is_temp_password: false,
  is_have_pin: false,
  is_ekyc: false,
  isLoading: false,
  messageError: '',
  code: 0,
  countAuthError: 0,
  is_verified_email: false,
  isSuccess: false
}

export const LogIn = createAction<any>('logIn')
export const GetNewToken = createAction('GetNewToken')


export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    loginStart: state => {
      state.isLoading = true
    }, 
    loginSuccess: (state, action: PayloadAction<any>) => {
      return { ...state, isLoading: false, isLoggedIn: true, isSuccess: true, ...action.payload }
    },
    loginFail: (state, action: PayloadAction<any>) => {
      return { ...state, isLoading: false, isLoggedIn: false, isSuccess: false, ...action.payload }
    },
    logOut: () => initialState,
    
    setMessageError: (state, action: PayloadAction<{ messageError: string; code: number }>) => {
      state.messageError = action.payload.messageError
      state.code = action.payload.code
    }, 
  },
})

export const {
  loginSuccess,
  logOut,
  loginStart,
  loginFail,
  setMessageError
} = authSlice.actions

export const selectAuth = (state: RootState) => state.authReducer
export default authSlice.reducer
