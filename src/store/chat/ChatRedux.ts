import { createSlice } from '@reduxjs/toolkit';
import { ChatType } from '@/store/chat/types';
import { MessageType } from '@/components/Chat/types';

const chatState = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  } as ChatType,
  reducers: {
    chatAdd: (state, { payload }: { payload: MessageType }) => {
      state.messages.push(payload);
    },
  },
});

export const { chatAdd } = chatState.actions;

export default chatState.reducer;
