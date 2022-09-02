import { fork, all } from 'redux-saga/effects'
import * as SagaMember from './Member/sagas'
import * as SagaAuth from './Auth/sagas'
import * as SagaClassroom from './Classroom/sagas'


export default function* sagas() {
  yield all(
    [
      ...Object.values(SagaMember),
      ...Object.values(SagaAuth),
      ...Object.values(SagaClassroom),
    ].map(fork)
  )
}
// export default sagas
