import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ITaskCreateRes, ITaskDelete, ITaskRes, ITaskState, ITaskUpdate,
} from '../../types/IColumnTasks';
import { orderSortTasks } from '../../utils/orderSort';
import {
  createTask, deleteTask, getColumnTasks, updateTask,
} from '../ac/tasks.ac';

const initialState: ITaskState = {
  tasks: {},
  error: '',
  isLoading: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {
    [getColumnTasks.fulfilled.type]: (state, action: PayloadAction<ITaskRes>) => {
      state.isLoading = false;
      state.error = '';
      const { col, response } = action.payload;
      state.tasks[col] = orderSortTasks(response.Tasks);
    },
    [getColumnTasks.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getColumnTasks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createTask.fulfilled.type]: (state, action: PayloadAction<ITaskCreateRes>) => {
      state.isLoading = false;
      state.error = '';
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const response = action.payload;
      const prevArr = [...state.tasks[response.column_id]];
      state.tasks[response.column_id] = orderSortTasks([...prevArr, response]);
    },
    [createTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateTask.fulfilled.type]: (state, action: PayloadAction<ITaskUpdate>) => {
      state.isLoading = false;
      state.error = '';
      const {
        id, taskTitle, order, columnId,
      } = action.payload;
      state.tasks[columnId] = [...state.tasks[columnId]]
        .map((task) => {
          if (task.id === id) {
            return { ...task, taskTitle, order };
          }
          return task;
        });
    },
    [updateTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTask.fulfilled.type]: (state, action: PayloadAction<ITaskDelete>) => {
      state.isLoading = false;
      state.error = '';
      const { col, id } = action.payload;
      const prevTasksArr = state.tasks[col];
      state.tasks[col] = [...prevTasksArr]
        .filter((task) => (task.id !== id));
    },
    [deleteTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default taskSlice.reducer;
