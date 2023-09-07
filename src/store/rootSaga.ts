import { all } from 'redux-saga/effects';
import watchAppState from './appState/AppStateSaga';

export default function* rootSaga() {
  yield all([watchAppState()]);
}
