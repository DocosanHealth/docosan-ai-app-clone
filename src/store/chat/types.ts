import { MessageType } from '@/components/Chat/types';

export type ChatType = {
  messages: Array<MessageType>;
  isLoading: boolean;
  conversationId: null | number;
  histories: Array<{
    id: number;
    messages: Array<any>;
    createdAt: string;
  }>;
  isShowModalHistory?: boolean;
  lastUpdatedAt: number;
};

export const CHAT_SEND_MESSAGE_REQUEST_SAGA = 'CHAT_SEND_MESSAGE_REQUEST_SAGA';
export const CHAT_HISTORY_REQUEST_SAGA = 'CHAT_HISTORY_REQUEST_SAGA';
