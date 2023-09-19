export type MessageType = {
  id: string;
  content?: string;
  createdAt?: Date;
  user: User;
  type: 'text' | 'suggestion';
  isSelf?: boolean;
};

export type User = {
  id: string;
  name?: string;
  avatar?: string;
};
