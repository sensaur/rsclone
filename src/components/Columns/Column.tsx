/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateColumn } from '../../redux/ac/column.ac';
import { IColumn, ITaskCreate } from '../../types/IColumnTasks';
import Task from '../Task/Task';
import TaskModal from '../Task/TaskModal';
import Confirm from '../Modals/Confirm';
import EditTitle from './EditTitle';
import {
  createTask, deleteTask, getColumnTasks,
} from '../../redux/ac/tasks.ac';

interface IColumnProps {
  column: IColumn,
  removeColumn: (e: IColumn) => void
  index: number
}

function Column({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index, column, removeColumn,
}: IColumnProps) {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((store) => store.taskSlice);
  const [isColumnModal, setIsColumnModal] = useState(false);
  const [title, setTitle] = useState(column.columnTitle);
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  useEffect(() => {
    (async () => {
      dispatch(getColumnTasks(column.id));
    })();
  }, []);
  const removeTask = (taskId: string) => {
    dispatch(deleteTask({
      id: taskId,
      col: column.id,
    }));
  };

  const renderTasks = tasks[column.id] ? tasks[column.id]
    .map((task, taskIndex) => (
      <Task
        key={task.id}
        index={taskIndex}
        task={task}
        columnId={column.id}
        removeTask={removeTask}
      />
    )) : null;

  const updateColumnTitle = (newTitle: string) => {
    dispatch(updateColumn({
      id: column.id,
      columnTitle: newTitle,
      order: column.order,
    }));
  };

  useEffect(() => {
    updateColumnTitle(title);
  }, [title]);

  const addTask = (newTaskInfo: string) => {
    const newTask: ITaskCreate = {
      taskTitle: newTaskInfo,
      order: tasks[column.id].length,
      column_id: column.id,
    };
    console.log(newTask);
    dispatch(createTask(newTask));
  };

  const handleClose = () => setIsColumnModal(false);
  const handleConfirm = () => {
    handleClose();
    removeColumn(column);
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {
          (provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className={`bg-color5 rounded-md w-96 flex flex-col gap-3 py-2 px-2 transition-colors duration-300 ${snapshot.isDragging ? 'shadow-xl shadow-gray-500 bg-color4' : ''}`}>
                <div className="flex justify-between px-2">
                  <EditTitle title={title} updateTitle={setTitle} />
                  <button type="button" className="text-xl text-black hover:text-color1 transition-colors duration-300" title="Delete column" aria-label="Delete column" onClick={() => setIsColumnModal(true)}>
                    <AiOutlineClose />
                  </button>
                </div>
                <Droppable droppableId={column.id} type="tasks">
                  {
                    (provided, snapshot) => (
                      <div
                        className={`py-2 rounded ${snapshot.isDraggingOver ? 'bg-color2' : ''}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {renderTasks}
                        {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
                <div className="text-center">
                  <button className="btn grow-0" type="button" onClick={() => (setIsAddTaskModal(true))}>Add task</button>
                </div>
              </div>
            </div>
          )
        }
      </Draggable>
      {isColumnModal
        && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="column" title={column.columnTitle} />)}
      {isAddTaskModal
        && (
        <TaskModal
          mode={false}
          task={null}
          onClose={setIsAddTaskModal}
          setTask={addTask}
          editTask={() => {}}
        />
        )}
    </>
  );
}

export default Column;
