/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { ICard } from '../../types/IColumn';
import Confirm from '../Modals/Confirm';
import CardModal from './CardModal';

interface ICardProps {
  title: string
  index: number
  card: ICard
  editCard: (e: ICard) => void
  removeCard: (e: ICard) => void
}

function Card({
  title, index, card, removeCard, editCard,
}: ICardProps) {
  const { id } = card;
  const [isCardModal, setIsCardModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const handleConfirm = () => {
    setIsCardModal(false);
    removeCard(card);
  };
  const handleClose = () => setIsCardModal(false);

  return (
    <>
      <Draggable draggableId={id.toString() + card.title} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`py-3 px-3 bg-color3 rounded-md mt-4 hover:bg-color4 transition-colors duration-300 ${snapshot.isDragging ? 'shadow-xl shadow-gray-500 bg-color4' : ''}`}
          >
            <div className="flex justify-between w-full items-center">
              <h3 className="font-semibold text-xl">{title}</h3>
              <div className="flex justify-between items-center">
                <button className="mr-3" type="button" onClick={() => setIsEditModal(true)}>
                  <AiFillEdit className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1" />
                </button>
                <button type="button" onClick={() => setIsCardModal(true)}>
                  <AiFillDelete className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1" />
                </button>
              </div>
            </div>
            <p className="text-lg py-2">{card.description}</p>
          </div>
        )}
      </Draggable>
      {isCardModal
        && (<Confirm onClose={handleClose} onConfirm={handleConfirm} text="" name="card" title={card.title} />)}
      {isEditModal
        && (<CardModal onClose={setIsEditModal} mode card={card} setCard={editCard} />)}
    </>
  );
}

export default Card;
