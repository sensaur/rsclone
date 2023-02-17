import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';

const getAllBoards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllBoards(), {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire(result);
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

export default getAllBoards;
