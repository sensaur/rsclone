import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';
import cardSlice from '../slices/cardSlice';
import columnSlice from '../slices/columnSlice';

const rootReducer = combineReducers({
  userSlice,
  cardSlice,
  columnSlice,
});

export default rootReducer;
