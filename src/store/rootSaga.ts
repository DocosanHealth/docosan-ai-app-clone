import { all } from 'redux-saga/effects';
import watchAppState from './appState/AppStateSaga';
import watchUser from './user/UserSaga';
import watchChat from './chat/ChatSaga';

export default function* rootSaga() {
  yield all([watchAppState(), watchUser(), watchChat()]);
}
