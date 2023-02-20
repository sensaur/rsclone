/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/redux';
import { updateColumn } from '../../redux/ac/column.ac';
// import { ITask, IColumn } from '../../types/IColumn';
import { IColumn } from '../../types/IColumn';
// import Task from '../Task/Task';
// import TaskModal from '../Task/TaskModal';
import Confirm from '../Modals/Confirm';
import EditTitle from './EditTitle';

interface IColumnProps {
  column: IColumn,
  removeColumn: (e: IColumn) => void
  // setColumns: React.Dispatch<React.SetStateAction<IColumnTasks[]>>
  index: number
}

function Column({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index, column, removeColumn,
}: IColumnProps) {
  const dispatch = useAppDispatch();
  const [isColumnModal, setIsColumnModal] = useState(false);
  const [title, setTitle] = useState(column.columnTitle);
  // const [isAddTaskModal, setIsAddTaskModal] = useState(false);

  // const removeTask = (task: ITask) => {
  //   setColumns((prev): IColumn[] => {
  //     const colsArr = [...prev];
  //     colsArr[index].tasks.splice(task.order, 1);
  //     colsArr[index].tasks = colsArr[index].tasks
  //       .map((taskItem, taskIndex) => ({ ...taskItem, order: taskIndex }));
  //     return [...colsArr];
  //   });
  // };

  // const editTask = (editInfo: ITask) => {
  //   setColumns((prev): IColumn[] => {
  //     const colsArr = [...prev];
  //     const tasksArr = colsArr[index].tasks;
  //     colsArr[index].tasks = tasksArr
  //       .map((elem) => (elem.order === editInfo.order
  //         ? { ...elem, title: editInfo.title, description: editInfo.description }
  //         : elem));
  //     return [...colsArr];
  //   });
  // };

  // const tasks = column.tasks
  //   .map((task, taskIndex) => (
  //     <Task
  //       key={task.id}
  //       index={taskIndex}
  //       task={task}
  //       title={task.title}
  //       removeTask={removeTask}
  //       editTask={editTask}
  //     />
  //   ));

  const updateColumnTitle = (newTitle: string) => {
    dispatch(updateColumn({ id: column.id, columnTitle: newTitle }));
  };

  useEffect(() => {
    updateColumnTitle(title);
  }, [title]);

  // const addTask = (newTaskInfo: ITask) => {
  //   setColumns((prev): IColumn[] => {
  //     const newTask = {
  //       ...newTaskInfo,
  //       columnId: column.id,
  //       order: column.tasks.length > 0
  //         ? column.tasks.length
  //         : 0,
  //     };
  //     prev[index].tasks = [...column.tasks, newTask];
  //     return [...prev];
  //   });
  // };

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
                        {/* {tasks} */}
                        {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
                <div className="text-center">
                  <button className="btn grow-0" type="button" onClick={() => (true)}>Add task</button>
                </div>
              </div>
            </div>
          )
        }
      </Draggable>
      {isColumnModal
        && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="column" title={column.columnTitle} />)}
      {/* {isAddTaskModal
        && (
        <TaskModal
          mode={false}
          task={column.tasks[0]}
          onClose={setIsAddTaskModal}
          setTask={addTask}
        />
        )} */}
    </>
  );
}

export default Column;
