import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';
import { IBoardAPI, ICreateBoard } from '../../types/IBoard';

const getAllBoards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllBoards(), {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

const getBoardById = createAsyncThunk(
  'boards/fetchOne',
  async (payload, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllBoards() + payload, {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

const createBoard = createAsyncThunk(
  'boards/fetchOne',
  async (payload: ICreateBoard, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllBoards(), {
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
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

const updateBoard = createAsyncThunk(
  'boards/fetchOne',
  async (payload: IBoardAPI, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllBoards() + payload.boardUUID, {
        method: 'PACTH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire(result);
        return payload;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

export {
  getAllBoards, getBoardById, createBoard, updateBoard,
};
