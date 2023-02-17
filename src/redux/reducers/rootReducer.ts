import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';
import boardSlice from '../slices/boardSlice';

const rootReducer = combineReducers({
  userSlice,
  boardSlice,
});

export default rootReducer;
