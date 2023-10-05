import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '@/services/api';
import {
  LoginPayload,
  USER_GET_PROFILE_REQUEST_SAGA,
  USER_LOGGED_SYNC_SAGA,
  USER_LOGIN_REQUEST_SAGA,
  USER_LOGOUT_REQUEST_SAGA,
  USER_UPDATE_PROFILE_REQUEST_SAGA,
  UserUpdatePayload,
} from '@/store/user/types';
import { Api, reset } from '@/services';
import { ActionPayload } from '@/store/types';
import { userUpdate } from '@/store/user/UserRedux';
import { chatHistoryAction } from "@/store/chat/ChatSaga";

const api = Api.create();

function* userLoginRequestSaga({ payload }: ActionPayload) {
  try {
    const response: ApiResponse = yield call(api.login, payload);

    if (response.ok && !!response.data?.is_valid) {
      // @ts-ignore
      global.token = response.data?.access_token;
      yield put(
        userUpdate({
          token: response.data?.access_token,
        }),
      );
      let _targetScreen = 'SChat';
      if (!response.data?.is_exist) {
        yield put(
          userUpdate({
            tempPhoneCode: payload.phone_code,
            tempPhoneNumber: payload.phone_number,
          }),
        );
        _targetScreen = 'SProfileEdit';
      } else {
        yield put(userLoggedSyncAction());
      }
      yield call(reset, _targetScreen);
    }

    if (response.data?.message) {
      Alert.alert('Thông báo', response.data?.message);
    }
    if (payload.onSuccess) {
      payload.onSuccess();
    }
  } catch (e) {
    if (payload.onError) {
      payload.onError();
    }
  }
}

function* userLogoutRequestSaga() {
  try {
    // @ts-ignore
    global.token = null;
    yield put(
      userUpdate({
        token: null,
        profile: null,
      }),
    );
    yield call(reset, 'SLogin');
  } catch (e) {}
}

function* userUpdateProfileRequestSaga({ payload }: ActionPayload) {
  try {
    const response: ApiResponse = yield call(api.updateProfile, payload);
    if (response.ok && response.data?.access_token) {
      // @ts-ignore
      global.token = response.data?.access_token;

      yield put(
        userUpdate({
          token: response.data?.access_token,
        }),
      );
      yield put(userLoggedSyncAction());
    }
  } catch (e) {}
}

function* userGetProfileSaga() {
  try {
    const response: ApiResponse = yield call(api.getProfile);
    if (response.ok && response.data) {
      yield put(
        userUpdate({
          profile: response.data,
        }),
      );
    }
  } catch (e) {}
}

function* userLoggedSyncSaga() {
  try {
    yield put(userGetProfileAction());
    yield put(chatHistoryAction());
  } catch (e) {}
}

export default function* watchUser() {
  yield takeLatest(USER_LOGIN_REQUEST_SAGA, userLoginRequestSaga);
  yield takeLatest(USER_LOGOUT_REQUEST_SAGA, userLogoutRequestSaga);
  yield takeLatest(
    USER_UPDATE_PROFILE_REQUEST_SAGA,
    userUpdateProfileRequestSaga,
  );
  yield takeLatest(USER_GET_PROFILE_REQUEST_SAGA, userGetProfileSaga);
  yield takeLatest(USER_LOGGED_SYNC_SAGA, userLoggedSyncSaga);
}

export const userLoginAction = (payload: LoginPayload): ActionPayload => ({
  type: USER_LOGIN_REQUEST_SAGA,
  payload,
});

export const userLogoutAction = (): ActionPayload => ({
  type: USER_LOGOUT_REQUEST_SAGA,
});

export const userUpdateAction = (
  payload: UserUpdatePayload,
): ActionPayload => ({
  type: USER_UPDATE_PROFILE_REQUEST_SAGA,
  payload,
});

export const userGetProfileAction = (): ActionPayload => ({
  type: USER_GET_PROFILE_REQUEST_SAGA,
});

export const userLoggedSyncAction = (): ActionPayload => ({
  type: USER_LOGGED_SYNC_SAGA,
});
