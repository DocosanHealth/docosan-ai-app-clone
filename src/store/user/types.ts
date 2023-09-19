export type UserProfile = Partial<{
  id: number;
  name: string;
  avatar: string;
  email: string;
}>;

export type UserType = {
  token: null | string;
  profile: null | UserProfile;
};

export type userPayload = {
  payload: Partial<UserType>;
};

export type LoginPayload = {
  phone_code: string;
  phone_number: string;
  code: string;
  language: string;
  is_login: 1;
  onSuccess?: () => any;
  onError?: () => any;
};
export const USER_LOGIN_REQUEST_SAGA = 'USER_LOGIN_REQUEST_SAGA';
