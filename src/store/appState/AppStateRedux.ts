import { createSlice } from '@reduxjs/toolkit';
import { AppStatePayload, AppStateType } from '@/store/appState/types';

const appState = createSlice({
  name: 'appState',
  initialState: {
    status: '',
    language: undefined,
    phoneCodes: [],
  } as AppStateType,
  reducers: {
    appStateUpdate: (
      state,
      { payload: { status, language, phoneCodes } }: AppStatePayload,
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
    },
  },
});

export const { appStateUpdate } = appState.actions;

export default appState.reducer;
