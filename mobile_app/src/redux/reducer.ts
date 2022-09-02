import { combineReducers } from 'redux'
import MemberReducer from './Member/slice'
import classroomReducer from './Classroom/slice'
import authReducer from './Auth/slice'
  
const rootReducer = combineReducers({
    MemberReducer,
    authReducer,
    classroomReducer
})

export default rootReducer
