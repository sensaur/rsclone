/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ICard } from '../types/IColumn';

interface ICardProps {
  title: string
  index: number
  card: ICard
}

function Card({ title, index, card }: ICardProps) {
  const { id } = card;
  return (
    <Draggable draggableId={id.toString() + card.title} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="p-3 bg-orange-400 border"
        >
          {title}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
