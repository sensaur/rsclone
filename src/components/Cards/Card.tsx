/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IColumn, IColumnTasks } from '../../types/IColumn';
import { updateTasksInColumns, changeListOrder } from '../../utils/updateTasksInColumns';
import AddColumn from '../Columns/AddColumn';
import ColumnsWraper from '../Columns/ColumnsWraper';
import Column from '../Columns/Column';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { getColumnById, getColumns } from '../../redux/ac/column.ac';
import {
  createColumn, deleteColumn, getColumns, setColumnsOrder,
} from '../../redux/ac/column.ac';
// import Toast from '../UI/toast';

interface UserItemPageParams {
  [n: string]: string;
}

function Card() {
  const { cards } = useAppSelector((state) => state.cardSlice);
  const { columns, error, isLoading } = useAppSelector((state) => state.columnSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<UserItemPageParams>();
  const { cardTitle } = cards.filter((el) => el.id === params.id)[0];
  // const [cols, setColumns] = useState<IColumnTasks[]>([]);
  console.log(columns);
  useEffect(() => {
    (async () => {
      if (params.id) {
        dispatch(getColumns(params.id));
      }
      if (!error) {
        // columns.Columns.map(async (column) => dispatch(getColumnById(column.id)));
        console.log('colsArr', columns.Columns);
        // setColumns(columns.Columns);
        // Toast.fire({
        //   icon: 'success',
        //   title: 'Сolumns loaded successfully',
        // });
      } else {
        await Swal.fire(error);
        navigate('/');
      }
    })();
  }, []);

  const addColumn = async (title: string) => {
    const newColumn = {
      columnTitle: title,
      order: columns.Columns.length,
      card_id: params.id!,
    };
    dispatch(createColumn(newColumn));
  };

  const removeColumn = async (column: IColumn) => {
    dispatch(deleteColumn(column.id));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (type === 'tasks') {
      // setColumns(updateTasksInColumns(columns.Columns, source, destination));
    }
    if (type === 'column') {
      const initialColumns = [...columns.Columns];
      const reorderedColumnsReq = changeListOrder(columns.Columns, source, destination)
        .map((elem, index) => ({
          id: elem.id, order: index,
        }));
      dispatch(setColumnsOrder(reorderedColumnsReq));
      if (error) {
        console.log('error from cards', error);
        // TODO: вернуть как было, выбросить ошибку
      }
    }
  };

  const renderColumns = columns.Columns.map((col, index) => (
    <Column
      key={col.id}
      index={index}
      column={col}
      removeColumn={removeColumn}
    />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between items-center py-5">
        <h2 className="text-3xl">{cardTitle}</h2>
        <AddColumn addColumn={addColumn} />
      </div>
      <ColumnsWraper>
        {renderColumns}
      </ColumnsWraper>
    </DragDropContext>
  );
}

export default Card;
