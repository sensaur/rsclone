import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';
import cardSlice from '../slices/cardSlice';

const rootReducer = combineReducers({
  userSlice,
  cardSlice,
});

export default rootReducer;
