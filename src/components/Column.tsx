/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IColumn } from '../types/IColumn';
import Card from './Card';

interface INewProps {
  column: IColumn,
  setColumns: (e: IColumn[]) => void
  index: number
}

function New({ index, column, setColumns }: INewProps) {
  const cards = column.cards
    .map((card, index) => <Card key={card.id} index={index} card={card} title={card.title} />);
  // console.log(index);
  return (
    <Draggable draggableId={column.id.toString()} index={index}>
      {
        (provided) => (
          <div
            ref={provided.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.draggableProps}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.dragHandleProps}
          >
            <div className='bg-color5 rounded-md flex flex-col gap-3 py-2 px-2'>
              <div className='flex justify-between px-2'>
                <h2>{column.title}</h2>
                <span>...</span>
              </div>
              <Droppable droppableId={column.id.toString() + column.title} type="cards">
                {
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  (provided) => (
                    <div
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {cards}
                      {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
              <div className='text-center'>
                <button className='btn grow-0' type="button" onClick={() => setColumns([column])}>Add card</button>
              </div>
            </div>
          </div>
        )
      }
    </Draggable>
  );
}

export default New;
