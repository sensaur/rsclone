import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const userSlice = createSlice({
  name: 'user',
  initialState: getInitState().user,
  reducers: {
    setUserSlice(state, action) {
      // eslint-disable-next-line no-return-assign,no-param-reassign
      return (state = action.payload);
    },
    deleteUserSlice(state) {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-param-reassign,no-return-assign
      return (state = null);
    },
  },
});

export const { setUserSlice } = userSlice.actions;
export default userSlice.reducer;
