import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';
import cardSlice from '../slices/cardSlice';
import columnSlice from '../slices/columnSlice';
import taskSlice from '../slices/taskSlice';

const rootReducer = combineReducers({
  userSlice,
  cardSlice,
  columnSlice,
  taskSlice,
});

export default rootReducer;
