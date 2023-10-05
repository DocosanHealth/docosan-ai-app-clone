export type UserProfile = Partial<{
  id: number;
  name: string;
  avatar: string;
  email: string;
}>;

export type UserType = {
  token: null | string;
  profile: null | UserProfile;
  tempPhoneNumber?: string;
  tempPhoneCode?: string;
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

export type UserUpdatePayload = Partial<{
  display_name: string;
  email: string;
  gender: number;
  phone_code: string;
  phone_number: string;
  type: string;
}>;
export const USER_LOGIN_REQUEST_SAGA = 'USER_LOGIN_REQUEST_SAGA';
export const USER_LOGOUT_REQUEST_SAGA = 'USER_LOGOUT_REQUEST_SAGA';
export const USER_UPDATE_PROFILE_REQUEST_SAGA =
  'USER_UPDATE_PROFILE_REQUEST_SAGA';
export const USER_GET_PROFILE_REQUEST_SAGA = 'USER_GET_PROFILE_REQUEST_SAGA';
export const USER_LOGGED_SYNC_SAGA = 'USER_LOGGED_SYNC_SAGA';
