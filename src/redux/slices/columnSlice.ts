import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IColumnAPI, IColumnsState, IColumnTasks, IColumnUpdete,
} from '../../types/IColumn';
import {
  createColumn, deleteColumn, getColumnById, getColumns, setColumnsOrder, updateColumn,
} from '../ac/column.ac';

const initialState: IColumnsState = {
  columns: {
    cardTitle: '',
    color: '#ffffff',
    Columns: [],
    id: 'default',
    order: 1,
    User: {
      userName: 'Default User',
      userUUID: 'Default UUID',
    },
  },
  isLoading: false,
  error: '',
};

const columnSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {},
  extraReducers: {
    [getColumns.fulfilled.type]: (state, action: PayloadAction<IColumnAPI>) => {
      state.isLoading = false;
      state.error = '';
      state.columns = action.payload;
    },
    [getColumns.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getColumns.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getColumnById.fulfilled.type]: (state, action: PayloadAction<IColumnTasks>) => {
      state.isLoading = false;
      state.error = '';
      const columns = [...state.columns.Columns];
      state.columns.Columns = columns
        .map((col) => (col.id === action.payload.id
          ? action.payload
          : col));
    },
    [getColumnById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getColumnById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createColumn.fulfilled.type]: (state, action: PayloadAction<IColumnTasks>) => {
      state.isLoading = false;
      state.error = '';
      state.columns.Columns.push(action.payload);
    },
    [createColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateColumn.fulfilled.type]: (state, action: PayloadAction<IColumnUpdete>) => {
      state.isLoading = false;
      state.error = '';
      state.columns.Columns = [...state.columns.Columns]
        .map((column) => {
          if (column.id === action.payload.id) {
            return { ...column, columnTitle: action.payload.columnTitle };
          }
          return column;
        });
    },
    [updateColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteColumn.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
      state.columns.Columns = [...state.columns.Columns]
        .filter((column) => (column.id !== action.payload));
    },
    [deleteColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [setColumnsOrder.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [setColumnsOrder.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setColumnsOrder.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default columnSlice.reducer;
