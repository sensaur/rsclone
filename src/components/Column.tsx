/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ICard, IColumn } from '../types/IColumn';
import Card from './Card';
import Confirm from './Modals/Confirm';

interface INewProps {
  column: IColumn,
  removeColumn: (e: IColumn) => void
  addCard: (col: IColumn, card: ICard) => void
  index: number
}

function Column({
  index, column, removeColumn, addCard,
}: INewProps) {
  const [isCardModal, setIsCardModal] = useState(false);
  const [isColumnModal, setIsColumnModal] = useState(false);
  const cards = column.cards
    .map((card, index) => <Card key={card.id} index={index} card={card} title={card.title} />);
  // console.log(index);

  const handleConfirm = () => removeColumn(column);
  const handleClose = () => setIsColumnModal(false);

  const setCard = () => (
    addCard(column, {
      id: Number(new Date()), order: 1, columnId: column.id, title: 'привет', isDone: false,
    }));
  return (
    <>
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
              <div className="bg-color5 rounded-md flex flex-col gap-3 py-2 px-2">
                <div className="flex justify-between px-2">
                  <h2>{column.title}</h2>
                  <button type="button" className="text-lg text-black" onClick={() => setIsColumnModal(true)}>x</button>
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
                <div className="text-center">
                  {/* <button className="btn grow-0" type="button" onClick={() => setIsCardModal(true)}>Add card</button> */}
                  <button className="btn grow-0" type="button" onClick={setCard}>Add card</button>
                </div>
              </div>
            </div>
          )
        }
      </Draggable>
      {isColumnModal && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="column" title={column.title} />)}
    </>
  );
}

export default Column;
