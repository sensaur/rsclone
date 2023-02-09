import React, { useState } from 'react';
import { IColumnProps } from '../types/IColumn';

function Column({
  title,
  column,
  drop,
  end,
  leave,
  over,
  start,
  children,
}: IColumnProps) {
  const [flag, setflag] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        border: `${flag ? '2px solid red' : '1px solid gray'}`,
        cursor: 'grab',
      }}
      draggable
      onDragStart={(e) => start(e, column)}
      onDragLeave={(e) => {
        setflag(false);
        leave(e);
      }}
      onDragOver={(e) => {
        setflag(true);
        over(e);
      }}
      onDragEnd={(e) => {
        setflag(false);
        end(e);
      }}
      onDrop={(e) => {
        setflag(false);
        drop(e, column);
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '5px',
          width: '100%',
          justifyContent: 'space-between',
          border: '1px solid gray',
        }}
      >
        <h2>{title}</h2>
        <span>...</span>
      </div>
      <div>
        {children}
      </div>
      <button type="button">add card</button>
    </div>
  );
}

export default Column;
