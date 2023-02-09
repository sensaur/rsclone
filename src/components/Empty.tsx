import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteUserSlice } from '../redux/slices/userSlice';
import { IColumn } from '../types/IColumn';
import AddColumn from './AddColumn';
import ColumnsList from './ColumnsList';

const columnsArr = [
  {
    id: 1, order: 1, title: 'Первая колонка', items: [{ id: 1, title: 'Задание из первой колонки', isDone: false }, { id: 2, title: 'Задание из первой колонки', isDone: false }, { id: 3, title: 'Задание из первой колонки', isDone: false }],
  },
  {
    id: 2, order: 2, title: 'Вторая колонка', items: [{ id: 1, title: 'Задание из второй колонки', isDone: false }, { id: 2, title: 'Задание из второй колонки', isDone: false }, { id: 3, title: 'Задание из второй колонки', isDone: false }],
  },
  {
    id: 3, order: 3, title: 'Третья колонка', items: [{ id: 1, title: 'Задание из третей колонки', isDone: false }, { id: 2, title: 'Задание из третей колонки', isDone: false }, { id: 3, title: 'Задание из третей колонки', isDone: false }],
  },
];

function Empty() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
  const [columns, setColumns] = useState<IColumn[]>(columnsArr);

  useEffect(() => {
    document.title = 'RS Clone';
  }, []);
  const handleClick = () => {
    dispatch(deleteUserSlice());
  };

  return (
    <div className="container">
      <h1>Трелло клон</h1>
      <AddColumn columns={columns} setColumns={setColumns} />
      {user && <button type="button" onClick={handleClick}>Разлогиниться</button>}
      <ColumnsList columns={columns} setColumns={setColumns} />
    </div>
  );
}

export default Empty;
