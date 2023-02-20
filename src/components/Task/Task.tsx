/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/redux';
import { updateTask } from '../../redux/ac/tasks.ac';
import { ITask } from '../../types/IColumnTasks';
import Confirm from '../Modals/Confirm';
import TaskModal from './TaskModal';

interface ITaskProps {
  columnId: string
  index: number
  task: ITask
  removeTask: (e: string) => void
}

function Card({
  columnId, index, task, removeTask,
}: ITaskProps) {
  const { id } = task;
  const [isTaskModal, setIsTaskModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useAppDispatch();
  const editTask = (editInfo: ITask) => {
    dispatch(updateTask({
      id: editInfo.id,
      order: editInfo.order,
      taskTitle: editInfo.taskTitle,
      columnId,
    }));
  };

  const handleConfirm = () => {
    setIsTaskModal(false);
    removeTask(task.id);
  };
  const handleClose = () => setIsTaskModal(false);

  return (
    <>
      <Draggable draggableId={id.toString() + task.taskTitle} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`py-3 px-3 bg-color3 rounded-md mt-4 hover:bg-color4 transition-colors duration-300 ${snapshot.isDragging ? 'shadow-xl shadow-gray-500 bg-color4' : ''}`}
          >
            <div className="flex justify-between w-full items-center">
              <h3 className="font-semibold text-xl">{task.taskTitle}</h3>
              <div className="flex justify-between items-center">
                <button className="mr-3" title="edit card" aria-label="Edit card" type="button" onClick={() => setIsEditModal(true)}>
                  <AiFillEdit className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1" />
                </button>
                <button type="button" title="delete card" aria-label="Delete card" onClick={() => setIsTaskModal(true)}>
                  <AiFillDelete className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1" />
                </button>
              </div>
            </div>
            <p className="text-lg py-2">{task.taskTitle}</p>
          </div>
        )}
      </Draggable>
      {isTaskModal
        && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="card" title={task.taskTitle} />)}
      {isEditModal
        && (
        <TaskModal
          onClose={setIsEditModal}
          mode
          task={task}
          editTask={editTask}
          setTask={() => {}}
        />
        )}
    </>
  );
}

export default Card;
