import { createAsyncThunk } from '@reduxjs/toolkit';
import * as endPoints from '../../config/endPoints';
import { IUserInfo } from '../../types/IUser';

export const signIn = createAsyncThunk(
  'user/fetchAll',
  async (payload: IUserInfo, thunkAPI) => {
    try {
      const res = await fetch(endPoints.signIn(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue('Неправильный логин / пароль');
    }
  },
);

export default signIn;
