// import type { PayloadAction } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { takeLatest, call, select, put } from 'redux-saga/effects'
import { getClassFeedApi, getClassHomework, getFeedDetailApi } from '../../services/classes'
import { getFeedDetail, LoadAuthorInfo, loadFeeds, loadHomeworks, setCurrentFeedDetail, setCurrentInfo, setFeeds, setFeedsLoading, setFeedsLoadingDone, setHomeworkLoading, setHomeworkLoadingDone, setHomeworks} from './slice'
import { getMeApi } from '../../services/user.service'

function* getFeedsSaga(actions: PayloadAction<any>): Generator<any, any, any> {
  try { 
    
    const { classId, page, searchQuery } = actions.payload;
    
    yield put(setFeedsLoading())
    const res = yield call(getClassFeedApi, classId, page, searchQuery)  
    if (res.status && res.data) { 
      const data = res.data  
      yield put(setFeeds(data))
    }
    yield put(setFeedsLoadingDone())
  } catch (e) {
    console.log("res.error", e)
  }
}

function* getHomeworkSaga(actions: PayloadAction<any>): Generator<any, any, any> {
  try { 
    
    const { classId, page } = actions.payload;
    
    yield put(setHomeworkLoading())
    const res = yield call(getClassHomework, classId, page)  
    if (res.status && res.data) { 
      const data = res.data   
      yield put(setHomeworks(data))
    }
    yield put(setHomeworkLoadingDone())
  } catch (e) {
    console.log("res.error", e)
  }
}

function* LoadAuthorInfoAsync(actions: PayloadAction<any>): Generator<any, any, any> {
  const result = yield call(getMeApi) 
  yield put(setCurrentInfo(result))
}

function* getFeedDetailSaga(actions: PayloadAction<any>): Generator<any, any, any> {
  yield put(setFeedsLoading())
  try { 
    const { feedId } = actions.payload; 
    const res = yield call(getFeedDetailApi, feedId) 
    if (res.status && res.data) {
      yield put(setCurrentFeedDetail(res.data))
    }
  } catch (e) {
    console.log("res.error", e)
  }
  yield put(setFeedsLoadingDone())
}
 

export default function* watchSagaMember() {
  yield takeLatest(loadFeeds.type, getFeedsSaga),  
  yield takeLatest(loadHomeworks.type, getHomeworkSaga),  
  yield takeLatest(getFeedDetail.type, getFeedDetailSaga)  
  yield takeLatest(LoadAuthorInfo.type, LoadAuthorInfoAsync)  
} 
  