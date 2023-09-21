import { MessageType } from '@/components/Chat/types';

export type ChatType = {
  messages: Array<MessageType>;
  isLoading: boolean;
  conversationId: null | number;
};

export const CHAT_SEND_MESSAGE_REQUEST_SAGA = 'CHAT_SEND_MESSAGE_REQUEST_SAGA';
