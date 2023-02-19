import { DraggableLocation } from 'react-beautiful-dnd';
import { IColumnTasks, ISwap } from '../types/IColumn';

export function changeListOrder<T>(
  list: T[],
  source: DraggableLocation,
  destination: DraggableLocation,
): T[] {
  const Safecopy = [...list];
  const [dragged] = Safecopy.splice(source.index, 1);
  Safecopy.splice(destination.index, 0, dragged);
  return Safecopy;
}

export function updateTasksInColumns(
  columns: IColumnTasks[],
  source: DraggableLocation,
  destination: DraggableLocation,
): ISwap[] {
  const colsList = [...columns];
  const sourceCol = colsList
    .filter((col) => col.id === source.droppableId)[0];
  const destinationCol = colsList
    .filter((col) => col.id === destination.droppableId)[0];
  const oldData = colsList
    .filter(
      (col) => (
        (col.id) !== source.droppableId
      && (col.id) !== destination.droppableId
      ),
    );

  if (source.droppableId === destination.droppableId) {
    const tasksList = changeListOrder(sourceCol.Tasks, source, destination);
    const reqParams = tasksList.map((task, index) => ({
      order: index,
      id: task.id,
    }));
    return reqParams;
  }
  const sourceTasksList = [...sourceCol.Tasks];
  const destinationTasksList = [...destinationCol.Tasks];
  const [importedTask] = sourceTasksList.splice(source.index, 1);
  destinationTasksList.splice(destination.index, 0, importedTask);
  sourceCol.Tasks = sourceTasksList
    .map((task, index) => ({
      ...task,
      id: task.id,
      order: index,
      columnId: +source.droppableId,
    }))
    .sort((a, b) => a.order - b.order);
  destinationCol.Tasks = destinationTasksList
    .map((task, index) => ({
      ...task,
      id: task.id,
      order: index,
      columnId: +destination.droppableId,
    }))
    .sort((a, b) => a.order - b.order);

  return [...oldData, sourceCol, destinationCol];
}
