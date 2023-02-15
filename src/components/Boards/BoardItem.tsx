/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

interface IBoardItemProps {
  boardId: number
}

function BoardItem({ boardId }: IBoardItemProps) {
  const navigate = useNavigate();
  const { boards } = useGlobalContext();
  return (
    <div className="p-5 rounded border border-color1 cursor-pointer hover:bg-color1 hover:text-white transition-colors duration-300" onClick={() => navigate(`/boards/${boardId}`)}>
      <h2 className="text-2xl">{boards[boardId].boardTitle}</h2>
    </div>
  );
}

export default BoardItem;
