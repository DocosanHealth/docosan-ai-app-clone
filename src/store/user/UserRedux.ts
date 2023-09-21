import { createSlice } from '@reduxjs/toolkit';
import { userPayload, UserType } from '@/store/user/types';

const userState = createSlice({
  name: 'user',
  initialState: {
    token: null,
    profile: {},
  } as UserType,
  reducers: {
    userUpdate: (state, { payload: { token, profile } }: userPayload) => {
      if (token !== undefined) {
        state.token = token;
      }
      if (profile !== undefined) {
        state.profile = profile;
      }
    },
  },
});

export const { userUpdate } = userState.actions;

export default userState.reducer;
