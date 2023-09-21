import { createSlice } from '@reduxjs/toolkit';
import { AppStatePayload, AppStateType } from '@/store/appState/types';

const appState = createSlice({
  name: 'appState',
  initialState: {
    status: '',
    language: undefined,
    phoneCodes: [],
    actionSheet: {
      visible: false,
      title: '',
      options: [],
    },
  } as AppStateType,
  reducers: {
    appStateUpdate: (
      state,
      {
        payload: { status, language, phoneCodes, actionSheet },
      }: AppStatePayload,
    ) => {
      if (status) {
        state.status = status;
      }
      if (language) {
        state.language = language;
      }
      if (phoneCodes) {
        state.phoneCodes = phoneCodes;
      }
      if (actionSheet) {
        state.actionSheet = actionSheet;
      }
    },
  },
});

export const { appStateUpdate } = appState.actions;

export default appState.reducer;
