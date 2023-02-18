import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';
import { ICardAPI, ICreateCard } from '../../types/ICard';

const getAllCards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllCards(), {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при получении всех бордов');
    }
  },
);

const getCardById = createAsyncThunk(
  'cards/fetchOne',
  async (payload, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllCards() + payload, {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при получении 1го борда');
    }
  },
);

const createCard = createAsyncThunk(
  'cards/create',
  async (payload: ICreateCard, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllCards(), {
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
      return thunkAPI.rejectWithValue('Что-то пошло не так при созадании борды');
    }
  },
);

const updateCard = createAsyncThunk(
  'cards/update',
  async (payload: ICardAPI, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllCards() + payload.cardUUID, {
        method: 'PATCH',
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
      return thunkAPI.rejectWithValue('Что-то пошло не так при редактировании');
    }
  },
);

const deleteCard = createAsyncThunk(
  'cards/delete',
  async (payload: ICardAPI, thunkAPI) => {
    try {
      const res = await fetch(endPoints.getAllCards() + payload.cardUUID, {
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

export {
  getAllCards, getCardById, createCard, updateCard, deleteCard,
};
