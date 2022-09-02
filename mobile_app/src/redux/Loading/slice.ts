import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { LoadingState } from './types'

export const initialState: LoadingState = {
  loading: [],
}

export const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      const loading = [...state.loading]
      if (action.payload) {
        loading.push(1)
        state.loading = loading
      }
      if (!action.payload) {
        loading.pop()
        state.loading = loading
      }
    },
    clearLoading: state => {
      state.loading = []
    },
  },
})

export const { setLoading, clearLoading } = loadingSlice.actions
export const selectLoading = (state: RootState) => state.loading
export default loadingSlice.reducer
