export type AppStateType = {
  status: string;
  language?: 'en' | 'vi';
  phoneCodes: Array<{
    name: string;
    name_vi: string;
    code: string;
    country: string;
    img: string;
  }>;
  actionSheet: {
    visible: boolean;
    title?: string;
    options: Array<{
      title: string;
      onPress: () => void;
    }>;
  };
  isAgreeDisclaimer: boolean;
};

export type AppStatePayload = {
  payload: Partial<AppStateType>;
};

export const APP_STATE_STARTUP_REQUEST_SAGA = 'APP_STATE_STARTUP_REQUEST_SAGA';
export const APP_STATE_SELECT_LANGUAGE_SAGA = 'APP_STATE_SELECT_LANGUAGE_SAGA';
export const APP_STATE_ENV_REQUEST_SAGA = 'APP_STATE_ENV_REQUEST_SAGA';
