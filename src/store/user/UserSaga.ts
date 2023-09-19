import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '@/services/api';
import { LoginPayload, USER_LOGIN_REQUEST_SAGA } from '@/store/user/types';
import { Api, reset } from "@/services";
import { ActionPayload } from '@/store/types';
import { userUpdate } from '@/store/user/UserRedux';

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
      yield call(reset, 'SChat');
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

export default function* watchUser() {
  yield takeLatest(USER_LOGIN_REQUEST_SAGA, userLoginRequestSaga);
}

export const userLoginAction = (payload: LoginPayload): ActionPayload => ({
  type: USER_LOGIN_REQUEST_SAGA,
  payload,
});
