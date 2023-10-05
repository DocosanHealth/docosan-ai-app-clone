import { createSlice } from '@reduxjs/toolkit';
import { userPayload, UserType } from '@/store/user/types';

const userState = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: {},
  } as UserType,
  reducers: {
    userUpdate: (
      state,
      {
        payload: { token, profile, tempPhoneNumber, tempPhoneCode },
      }: userPayload,
    ) => {
      if (token !== undefined) {
        state.token = token;
      }
      if (profile !== undefined) {
        state.profile = profile;
      }
      if (tempPhoneNumber !== undefined) {
        state.tempPhoneNumber = tempPhoneNumber;
      }
      if (tempPhoneCode !== undefined) {
        state.tempPhoneCode = tempPhoneCode;
      }
    },
  },
});

export const { userUpdate } = userState.actions;

export default userState.reducer;
