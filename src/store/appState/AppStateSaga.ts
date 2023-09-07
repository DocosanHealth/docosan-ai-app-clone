import { takeLatest, select, put, call } from 'redux-saga/effects';
import {
  APP_STATE_ENV_REQUEST_SAGA,
  APP_STATE_SELECT_LANGUAGE_SAGA,
  APP_STATE_STARTUP_REQUEST_SAGA,
} from '@/store/appState/types';
import { ActionPayload } from '@/store/types';
import { RootState } from '@/store';
import { getDeviceLanguage } from '@/services/helpers';
import { appStateUpdate } from '@/store/appState/AppStateRedux';
import i18next from 'i18next';
import Api, { ApiResponse } from '@/services/api';

const api = Api.create();
function* appStartupSaga() {
  // set app language initial
  const appLanguage: string = yield select(
    (state: RootState) => state.appState.language,
  );

  let _appLanguage = appLanguage;
  if (!appLanguage) {
    const deviceLanguage: 'en' | 'vi' = getDeviceLanguage();
    if (['en', 'vi'].indexOf(deviceLanguage) >= 0) {
      _appLanguage = deviceLanguage;
      yield put(
        appStateUpdate({
          language: deviceLanguage,
        }),
      );
    }
  }
  i18next.changeLanguage(_appLanguage);

  yield put({
    type: APP_STATE_ENV_REQUEST_SAGA,
  });
}

function* appSelectLanguageSaga() {
  console.tron.log!('appSelectLanguageSaga()');
}

function* appEnvRequestSaga() {
  try {
    const response: ApiResponse = yield call(api.getEnvironment);

    if (response.ok) {
      yield put(
        appStateUpdate({
          phoneCodes: response?.data?.phone_codes || [],
        }),
      );
    }
  } catch (e) {}
}

export default function* watchAppState() {
  yield takeLatest(APP_STATE_STARTUP_REQUEST_SAGA, appStartupSaga);
  yield takeLatest(APP_STATE_SELECT_LANGUAGE_SAGA, appSelectLanguageSaga);
  yield takeLatest(APP_STATE_ENV_REQUEST_SAGA, appEnvRequestSaga);
}

export const appStartupAction = (): ActionPayload => ({
  type: APP_STATE_STARTUP_REQUEST_SAGA,
});

export const appSelectLanguageAction = (language: string): ActionPayload => ({
  type: APP_STATE_SELECT_LANGUAGE_SAGA,
  payload: language,
});

export const appEnvRequestAction = (): ActionPayload => ({
  type: APP_STATE_ENV_REQUEST_SAGA,
});
