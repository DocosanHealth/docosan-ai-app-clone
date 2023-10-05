import { createSlice } from '@reduxjs/toolkit';
import { ChatType } from '@/store/chat/types';
import { MessageType } from '@/components/Chat/types';
import moment from "moment";

const chatState = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    conversationId: null,
    histories: [],
    isShowModalHistory: false,
    lastUpdatedAt: 0,
  } as ChatType,
  reducers: {
    chatAdd: (state, { payload }: { payload: MessageType }) => {
      state.messages.push(payload);
    },
    chatUpdateLoading: (state, { payload }: { payload: boolean }) => {
      state.isLoading = payload;
    },
    chatUpdateConversationId: (state, { payload }: { payload: number }) => {
      state.conversationId = payload;
    },
    chatUpdateMessages: (state, { payload }: { payload: Array<any> }) => {
      state.messages = payload;
    },
    chatUpdateHistory: (state, { payload }: { payload: Array<any> }) => {
      state.histories = payload;
    },
    chatReset: state => {
      state.messages = [];
      state.conversationId = null;
      state.isLoading = false;
      state.lastUpdatedAt = moment().valueOf();
    },
    chatShowModalHistory: (state, { payload }: { payload: boolean }) => {
      state.isShowModalHistory = payload;
    },
  },
});

export const {
  chatAdd,
  chatUpdateLoading,
  chatUpdateConversationId,
  chatUpdateMessages,
  chatUpdateHistory,
  chatReset,
  chatShowModalHistory,
} = chatState.actions;

export default chatState.reducer;
