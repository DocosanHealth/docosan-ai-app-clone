import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '@/services/api';
import { CHAT_SEND_MESSAGE_REQUEST_SAGA } from '@/store/chat/types';
import { Api } from '@/services';
import { ActionPayload } from '@/store/types';
import {
  chatAdd,
  chatUpdateConversationId,
  chatUpdateLoading,
} from '@/store/chat/ChatRedux';
import { RootState } from '@/store';
import { UserProfile } from '@/store/user/types';
import { MessageType } from '@/components/Chat/types';
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';
import moment from "moment";

const api = Api.create();

function* chatSendMessageRequestSaga({ payload }: ActionPayload) {
  try {
    const currentUser: UserProfile = yield select(
      (state: RootState) => state.user.profile,
    );
    const conversationId: number | null = yield select(
      (state: RootState) => state.chat.conversationId || null,
    );
    const language: number | null = yield select(
      (state: RootState) => state.appState.language || 'vi',
    );
    const deviceUniqueId: string = yield call(DeviceInfo.getUniqueId);

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
    yield put(chatUpdateLoading(true));

    let history: Array<MessageType> = yield select(
      (state: RootState) => state.chat.messages || [],
    );
    const _messages = history.map(item => ({
      role: item.user.id === '-1' ? 'assistant' : 'user',
      content: item.content,
    }));

    const _apiPayload = {
      message: JSON.stringify(_messages),
      conversation_id: conversationId,
      language,
      device_id: deviceUniqueId,
    };

    const response: ApiResponse = yield call(api.sendMessage, _apiPayload);

    if (response.ok && !!response.data?.message) {
      yield put(
        chatAdd({
          id: moment().format('X'),
          content: response.data?.message,
          type: 'text',
          user: {
            id: '-1',
            name: 'Dr An',
          },
        }),
      );
      if (response.data?.conversation_id) {
        yield put(chatUpdateConversationId(response.data?.conversation_id));
      }
    }
  } catch (e) {
    Alert.alert('Error', e.message);
  }

  yield put(chatUpdateLoading(false));
}

export default function* watchChat() {
  yield takeLatest(CHAT_SEND_MESSAGE_REQUEST_SAGA, chatSendMessageRequestSaga);
}

export const chatSendMessageAction = (payload: string): ActionPayload => ({
  type: CHAT_SEND_MESSAGE_REQUEST_SAGA,
  payload,
});
