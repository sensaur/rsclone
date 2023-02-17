/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoardAPI } from '../../types/IBoard';

interface IBoardItemProps {
  board: IBoardAPI
}

function BoardItem({ board }: IBoardItemProps) {
  const navigate = useNavigate();
  return (
    <div className={`p-5 rounded border border-color1 cursor-pointer hover:bg-color1 hover:text-white transition-colors duration-300 ${board.color}`} onClick={() => navigate(`/boards/${board.boardUUID}`)}>
      <h2 className="text-2xl">{board.boardTitle}</h2>
    </div>
  );
}

export default BoardItem;
