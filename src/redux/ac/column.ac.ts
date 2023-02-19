import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';
import { IColumnCreate, IColumnUpdete, ISwap } from '../../types/IColumn';

const getColumns = createAsyncThunk(
  'columns/fetchAll',
  async (payload: string, thunkAPI) => {
    try {
      const res = await fetch(endPoints.cards() + payload, {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result || [];
      }
      throw new Error('error loading columns');
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при получении всех колонок борда');
    }
  },
);

const getColumnById = createAsyncThunk(
  'columns/fetchOne',
  async (payload: string, thunkAPI) => {
    try {
      const res = await fetch(endPoints.columns() + payload, {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result || [];
      }
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при получении 1го колонки');
    }
  },
);

const createColumn = createAsyncThunk(
  'columns/create',
  async (payload: IColumnCreate, thunkAPI) => {
    try {
      const res = await fetch(endPoints.columns(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire('The board was successfuly created!');
        return { ...result, Tasks: [] };
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при созадании борды');
    }
  },
);

const updateColumn = createAsyncThunk(
  'columns/update',
  async (payload: IColumnUpdete, thunkAPI) => {
    try {
      const res = await fetch(endPoints.columns() + payload.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return payload;
      }
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при редактировании');
    }
  },
);

const deleteColumn = createAsyncThunk(
  'columns/delete',
  async (payload: string, thunkAPI) => {
    try {
      const res = await fetch(endPoints.columns() + payload, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire(result);
        return payload;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при удалении');
    }
  },
);

const setColumnsOrder = createAsyncThunk(
  'columns/setOrder',
  async (payload: ISwap[], thunkAPI) => {
    try {
      console.log(payload);
      console.log(JSON.stringify(payload));
      const res = await fetch(endPoints.setColumnsOrder(), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        // await Swal.fire(result);
        console.log('Поменяли', payload, result);
      }
      console.log('error', await res.json());
      throw new Error('Ошибка при реордере');
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export {
  getColumns, getColumnById, createColumn, updateColumn, deleteColumn, setColumnsOrder,
};
