import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '@/services/api';
import { CHAT_SEND_MESSAGE_REQUEST_SAGA } from '@/store/chat/types';
import { Api } from '@/services';
import { ActionPayload } from '@/store/types';
import { chatAdd } from '@/store/chat/ChatRedux';
import { RootState } from '@/store';
import { UserProfile } from '@/store/user/types';
import { MessageType } from '@/components/Chat/types';

const api = Api.create();

function* chatSendMessageRequestSaga({ payload }: ActionPayload) {
  try {
    const currentUser: UserProfile = yield select(
      (state: RootState) => state.user.profile,
    );

    yield put(
      chatAdd({
        id: new Date().toString(),
        content: payload,
        type: 'text',
        user: {
          id: currentUser?.id?.toString() || '0',
          name: currentUser?.name || '',
          avatar: currentUser?.avatar,
        },
      }),
    );

    let history: Array<MessageType> = yield select(
      (state: RootState) => state.chat.messages || [],
    );
    const _messages = history.map(item => ({
      role: item.user.id === '-1' ? 'assistant' : 'user',
      content: item.content,
    }));

    const _apiPayload = {
      message: JSON.stringify(_messages),
    };

    const response: ApiResponse = yield call(api.sendMessage, _apiPayload);

    if (response.ok && !!response.data?.message) {
      yield put(
        chatAdd({
          id: new Date().toString(),
          content: response.data?.message,
          type: 'text',
          user: {
            id: '-1',
            name: 'Dr An',
          },
        }),
      );
    }
  } catch (e) {}
}

export default function* watchChat() {
  yield takeLatest(CHAT_SEND_MESSAGE_REQUEST_SAGA, chatSendMessageRequestSaga);
}

export const chatSendMessageAction = (payload: string): ActionPayload => ({
  type: CHAT_SEND_MESSAGE_REQUEST_SAGA,
  payload,
});
