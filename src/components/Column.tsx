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
            <div style={{ background: 'gray' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  marginBottom: '20px',
                  width: '100%',
                  justifyContent: 'space-between',
                  border: '1px solid red',
                }}
              >
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
                      className="bg-blue-500 p-4"
                    >
                      {cards}
                      {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
              <button type="button" onClick={() => setColumns([column])}>add card</button>
            </div>
          </div>
        )
      }
    </Draggable>
  );
}

export default New;
