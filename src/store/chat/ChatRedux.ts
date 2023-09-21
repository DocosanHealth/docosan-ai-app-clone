import { createSlice } from '@reduxjs/toolkit';
import { ChatType } from '@/store/chat/types';
import { MessageType } from '@/components/Chat/types';

const chatState = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    conversationId: null,
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
    chatReset: state => {
      state.messages = [];
      state.conversationId = null;
      state.isLoading = false;
    },
  },
});

export const {
  chatAdd,
  chatUpdateLoading,
  chatUpdateConversationId,
  chatReset,
} = chatState.actions;

export default chatState.reducer;
