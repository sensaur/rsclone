import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IColumn } from '../types/IColumn';
import { updateCardsInColumns, changeListOrder } from '../utils/updateCardsInColumns';
import AddColumn from './AddColumn';
import ColumnsWraper from './ColumnsWraper';
import New from './Column';

const columnsArr = [
  {
    id: 1,
    order: 1,
    title: 'Первая колонка',
    cards: [
      {
        id: 1, order: 1, columnId: 1, title: 'Задание 1 из первой колонки', isDone: false,
      },
      {
        id: 2, order: 2, columnId: 1, title: 'Задание 2 из первой колонки', isDone: false,
      },
      {
        id: 3, order: 3, columnId: 1, title: 'Задание 3 из первой колонки', isDone: false,
      },
    ],
  },
  {
    id: 2,
    order: 2,
    title: 'Вторая колонка',
    cards: [
      {
        id: 4, order: 1, columnId: 2, title: 'Задание 1 из второй колонки', isDone: false,
      },
      {
        id: 5, order: 2, columnId: 2, title: 'Задание 2 из второй колонки', isDone: false,
      },
      {
        id: 6, order: 3, columnId: 2, title: 'Задание 3 из второй колонки', isDone: false,
      },
    ],
  },
  {
    id: 3,
    order: 3,
    title: 'Третья колонка',
    cards: [
      {
        id: 7, order: 1, columnId: 3, title: 'Задание 1 из третей колонки', isDone: false,
      },
      {
        id: 8, order: 2, columnId: 3, title: 'Задание 2 из третей колонки', isDone: false,
      },
      {
        id: 9, order: 3, columnId: 3, title: 'Задание 3 из третей колонки', isDone: false,
      },
    ],
  },
];

// interface IColumnsListProps {
// columns: IColumn[]
// setColumns: (e: IColumn[]) => void
// { columns, setColumns }: IColumnsListProps
// }

function Columns() {
  const [columns, setColumns] = useState<IColumn[]>(columnsArr);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === 'cards') {
      setColumns(updateCardsInColumns(columns, source, destination));
    }
    if (type === 'column') {
      // const initialColumns = [...columns];
      const reorderedColumns = changeListOrder(columns, source, destination);
      setColumns(reorderedColumns);
    }
  };

  const renderColumns = columns.map((col, index) => (
    <New key={col.id} index={index} column={col} setColumns={setColumns} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddColumn columns={columns} setColumns={setColumns} />
      <ColumnsWraper>
        {renderColumns}
      </ColumnsWraper>
    </DragDropContext>
  );
}

export default Columns;
