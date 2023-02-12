import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IColumn } from '../../types/IColumn';
import { updateCardsInColumns, changeListOrder } from '../../utils/updateCardsInColumns';
import AddColumn from './AddColumn';
import ColumnsWraper from './ColumnsWraper';
import Column from './Column';

const columnsArr = [
  {
    id: 1,
    order: 1,
    title: 'Первая колонка',
    cards: [
      {
        id: 1, order: 1, columnId: 1, title: 'Задание 1 из первой колонки', isDone: false, description: 'default',
      },
      {
        id: 2, order: 2, columnId: 1, title: 'Задание 2 из первой колонки', isDone: false, description: 'default',
      },
      {
        id: 3, order: 3, columnId: 1, title: 'Задание 3 из первой колонки', isDone: false, description: 'default',
      },
    ],
  },
  {
    id: 2,
    order: 2,
    title: 'Вторая колонка',
    cards: [
      {
        id: 4, order: 1, columnId: 2, title: 'Задание 1 из второй колонки', isDone: false, description: 'default',
      },
      {
        id: 5, order: 2, columnId: 2, title: 'Задание 2 из второй колонки', isDone: false, description: 'default',
      },
      {
        id: 6, order: 3, columnId: 2, title: 'Задание 3 из второй колонки', isDone: false, description: 'default',
      },
    ],
  },
  {
    id: 3,
    order: 3,
    title: 'Третья колонка',
    cards: [
      {
        id: 7, order: 1, columnId: 3, title: 'Задание 1 из третей колонки', isDone: false, description: 'default',
      },
      {
        id: 8, order: 2, columnId: 3, title: 'Задание 2 из третей колонки', isDone: false, description: 'default',
      },
      {
        id: 9, order: 3, columnId: 3, title: 'Задание 3 из третей колонки', isDone: false, description: 'default',
      },
    ],
  },
];

function Columns() {
  const [columns, setColumns] = useState<IColumn[]>(columnsArr);
  const removeColumn = (column: IColumn) => {
    setColumns((prev): IColumn[] => {
      const colsArr = [...prev];
      const colIndex = colsArr.indexOf(column);
      colsArr.splice(colIndex, 1);
      return colsArr;
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === 'cards') {
      setColumns(updateCardsInColumns(columns, source, destination));
    }
    if (type === 'column') {
      // const initialColumns = [...columns];
      const reorderedColumns = changeListOrder(columns, source, destination)
        .map((elem, index) => ({
          ...elem, order: index,
        }))
        .sort((a, b) => a.order - b.order);
      setColumns(reorderedColumns);
    }
  };

  const renderColumns = columns.map((col, index) => (
    <Column
      key={col.id}
      index={index}
      column={col}
      removeColumn={removeColumn}
      setColumns={setColumns}
    />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddColumn setColumns={setColumns} />
      <ColumnsWraper>
        {renderColumns}
      </ColumnsWraper>
    </DragDropContext>
  );
}

export default Columns;
