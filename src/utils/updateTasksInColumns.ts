import { DraggableLocation } from 'react-beautiful-dnd';
import { IColumn } from '../types/IColumn';

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
  columns: IColumn[],
  source: DraggableLocation,
  destination: DraggableLocation,
): IColumn[] {
  const colsList = [...columns];
  const sourceCol = colsList
    .filter((col) => (col.id.toString() + col.title) === source.droppableId)[0];
  const destinationCol = colsList
    .filter((col) => (col.id.toString() + col.title) === destination.droppableId)[0];
  const oldData = colsList
    .filter(
      (col) => (
        (col.id.toString() + col.title) !== source.droppableId
      && (col.id.toString() + col.title) !== destination.droppableId
      ),
    );

  if (source.droppableId === destination.droppableId) {
    const cardList = changeListOrder(sourceCol.tasks, source, destination);
    sourceCol.tasks = cardList.map((task, index) => ({
      ...task,
      order: index,
    }));
    return [...oldData, sourceCol].sort((a, b) => a.order - b.order);
  }
  const sourceTasksList = [...sourceCol.tasks];
  const destinationTasksList = [...destinationCol.tasks];
  const [importedTask] = sourceTasksList.splice(source.index, 1);
  destinationTasksList.splice(destination.index, 0, importedTask);
  sourceCol.tasks = sourceTasksList
    .map((task, index) => ({
      ...task,
      id: task.id,
      order: index,
      columnId: +source.droppableId,
    }))
    .sort((a, b) => a.order - b.order);
  destinationCol.tasks = destinationTasksList
    .map((task, index) => ({
      ...task,
      id: task.id,
      order: index,
      columnId: +destination.droppableId,
    }))
    .sort((a, b) => a.order - b.order);

  return [...oldData, sourceCol, destinationCol].sort((a, b) => a.order - b.order);
}
