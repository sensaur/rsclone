import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ICard, IColumn } from '../../types/IColumn';
import Card from '../Card/Card';
import CardModal from '../Card/CardModal';
import Confirm from '../Modals/Confirm';
import EditTitle from './EditTitle';

interface INewProps {
  column: IColumn,
  removeColumn: (e: IColumn) => void
  setColumns: (value: React.SetStateAction<IColumn[]>) => void
  index: number
}

function Column({
  index, column, removeColumn, setColumns,
}: INewProps) {
  const [isColumnModal, setIsColumnModal] = useState(false);
  const [isAddCardModal, setIsAddCardModal] = useState(false);
  const cards = column.cards
    .map((card, cardIndex) => (
      <Card
        key={card.id}
        index={cardIndex}
        card={card}
        title={card.title}
      />
    ));

  const updateColumnTitle = (newTitle: string) => {
    setColumns((prev): IColumn[] => {
      prev[index].title = newTitle;
      return [...prev];
    });
  };

  const addCard = (newCardInfo: ICard) => {
    setColumns((prev): IColumn[] => {
      const newCard = {
        ...newCardInfo,
        columnId: column.id,
        order: column.cards.length > 0
          ? column.cards.length - 1
          : 1,
      };
      prev[index].cards = [...column.cards, newCard];
      return [...prev];
    });
  };

  const handleConfirm = () => removeColumn(column);
  const handleClose = () => setIsColumnModal(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
              <div className="bg-color5 rounded-md w-96 flex flex-col gap-3 py-2 px-2">
                <div className="flex justify-between px-2">
                  <EditTitle title={column.title} updateTitle={updateColumnTitle} />
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
                  <button className="btn grow-0" type="button" onClick={() => setIsAddCardModal(true)}>Add card</button>
                </div>
              </div>
            </div>
          )
        }
      </Draggable>
      {isColumnModal && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="column" title={column.title} />)}
      {isAddCardModal && (<CardModal onClose={setIsAddCardModal} addCard={addCard} />)}
    </>
  );
}

export default Column;
