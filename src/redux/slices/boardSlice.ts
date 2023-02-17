import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoadsState, IBoardAPI } from '../../types/IBoard';
import getAllBoards from '../ac/board.ac';

const initialState: IBoadsState = {
  boards: [],
  isLoading: false,
  error: '',
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBoards.fulfilled.type]: (state, action: PayloadAction<IBoardAPI[]>) => {
      state.isLoading = false;
      state.error = '';
      state.boards = action.payload;
    },
    [getAllBoards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default boardSlice.reducer;
