import React, { useState } from 'react';
import { ICard, IColumn } from '../types/IColumn';
import Column from './Column';

interface IColumnsListProps {
  columns: IColumn[]
  setColumns: (e: IColumn[]) => void
}

function ColumnsList({ columns, setColumns }: IColumnsListProps) {
  const [currentColumn, setCurrentColumn] = useState<IColumn | null>(null);
  // const [columns, setColumns] = useState<IColumn[]>(columnsArr);
  const [currentCard, setCurrentCard] = useState<ICard | null>(null);

  const dragStartHendler = (e: React.DragEvent<HTMLDivElement>, column: IColumn): void => {
    setCurrentColumn(column);
  };
  const dragLeaveHendler = (): void => {
  };
  const dragEndHendler = (): void => {
  };
  const dragOverHendler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };
  const dropHendler = (e: React.DragEvent<HTMLDivElement>, column: IColumn): void => {
    e.preventDefault();
    setColumns(columns.map((elem) => {
      if (elem.id === column.id && currentColumn) {
        return { ...elem, order: currentColumn.order };
      }
      if (elem.id === currentColumn?.id) {
        return { ...elem, order: column.order };
      }
      return elem;
    }));
  };

  const dragItemStartHendler = (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn,
    item: ICard,
  ): void => {
    setCurrentColumn(column);
    setCurrentCard(item);
  };

  const dragItemLeaveHendler = (e: React.DragEvent<HTMLDivElement>): void => {
    // @ts-ignore
    e.target.style.boxShadow = 'none';
  };

  const dragItemEndHendler = (e: React.DragEvent<HTMLDivElement>): void => {
    // @ts-ignore
    e.target.style.boxShadow = 'none';
  };

  const dragItemOverHendler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    // @ts-ignore
    if (e.target.className === 'item') {
      // @ts-ignore
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  };

  const dropItemHendler = (
    e: React.DragEvent<HTMLDivElement>,
    column: IColumn,
    item: ICard,
  ): void => {
    e.preventDefault();
    if (currentCard && currentColumn) {
      const currentIndex = currentColumn.items.indexOf(currentCard);
      currentColumn.items.splice(currentIndex, 1);
      const dropIndex = column.items.indexOf(item);
      column.items.splice(dropIndex + 1, 0, currentCard);
      setColumns(columns.map((el) => {
        if (column.id === el.id) {
          return column;
        }
        if (currentColumn.id === el.id) {
          return currentColumn;
        }
        return column;
      }));
    }
    setColumns(columns.map((elem) => {
      if (elem.id === column.id && currentColumn) {
        return { ...elem, order: currentColumn.order };
      }
      if (elem.id === currentColumn?.id) {
        return { ...elem, order: column.order };
      }
      return elem;
    }));
  };

  const sortColumns = (a: IColumn, b: IColumn) => {
    if (a.order > b.order) {
      return 1;
    }
    return -1;
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {columns.sort(sortColumns).map((column) => (
        <Column
          key={column.id}
          title={column.title}
          column={column}
          start={dragStartHendler}
          leave={dragLeaveHendler}
          end={dragEndHendler}
          over={dragOverHendler}
          drop={dropHendler}
        >
          {column.items.map((item) => (
            <div
              className="item"
              key={item.title + item.id}
              style={{
                border: '2px solid black', padding: '5px',
              }}
              onDragOver={(e) => dragItemOverHendler(e)}
              onDragLeave={(e) => dragItemLeaveHendler(e)}
              onDragStart={(e) => dragItemStartHendler(e, column, item)}
              onDragEnd={(e) => dragItemEndHendler(e)}
              onDrop={(e) => dropItemHendler(e, column, item)}
              draggable
            >
              <h2 style={{ textDecoration: `${item.isDone} ? 'line-through': ''` }}>
                {item.id}
                {' '}
                {item.title}
              </h2>
            </div>
          ))}
        </Column>
      ))}
    </div>
  );
}

export default ColumnsList;
