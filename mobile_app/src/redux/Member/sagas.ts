// import type { PayloadAction } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import { takeLatest, call, select, put } from 'redux-saga/effects'
import { getClassMembers } from '../../services/classes'
import { loadMembers, loadMembersStart, loadMore, reloadMembers, setMembers, setMoreMembers } from './slice'

function* getMembersSaga(actions: PayloadAction<any>): Generator<any, any, any> {
  try { 
    
    const { classId, page, searchQuery } = actions.payload;
    
    yield put(loadMembersStart())
    const res = yield call(getClassMembers, classId, page, searchQuery)  
    if (res.data) {  
      yield put(setMembers(res.data))
    }
  } catch (e) {
    console.log("res.error", e)
  }
}

function* loadMoreMembersSaga(actions: PayloadAction<any>): Generator<any, any, any> {
  try {  
    const { classId, page, searchQuery } = actions.payload;
    
    yield put(loadMembersStart())
    const res = yield call(getClassMembers, classId, page, searchQuery)
   
    if (res.status && res.data) { 
      const data = res.data.results   
      yield put(setMoreMembers(data))
    } 
  } catch (e) {
    console.log("res.error", e)
  }
}

 

export default function* watchSagaMember() {
  yield takeLatest(loadMembers.type, getMembersSaga) 
  yield takeLatest(loadMore.type, loadMoreMembersSaga) 
 
} 
  