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

export function updateCardsInColumns(
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
    const cardList = changeListOrder(sourceCol.cards, source, destination);
    sourceCol.cards = cardList.map((card, index) => ({
      ...card,
      order: index,
    }));
    return [...oldData, sourceCol].sort((a, b) => a.order - b.order);
  }
  const sourceCardsList = [...sourceCol.cards];
  const destinationCardsList = [...destinationCol.cards];
  const [importedCard] = sourceCardsList.splice(source.index, 1);
  destinationCardsList.splice(destination.index, 0, importedCard);
  sourceCol.cards = sourceCardsList
    .map((card, index) => ({
      ...card,
      id: card.id,
      order: index,
      columnId: +source.droppableId,
    }))
    .sort((a, b) => a.order - b.order);
  destinationCol.cards = destinationCardsList
    .map((card, index) => ({
      ...card,
      id: card.id,
      order: index,
      columnId: +destination.droppableId,
    }))
    .sort((a, b) => a.order - b.order);

  return [...oldData, sourceCol, destinationCol].sort((a, b) => a.order - b.order);
}
