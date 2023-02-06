import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';

const rootReducer = combineReducers({
  userSlice,
});

export default rootReducer;
