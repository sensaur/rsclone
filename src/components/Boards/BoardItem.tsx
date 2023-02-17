/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard } from '../../redux/ac/board.ac';
import { IBoardAPI } from '../../types/IBoard';
import Confirm from '../Modals/Confirm';
import BoardModal from './BoardModal';

interface IBoardItemProps {
  board: IBoardAPI
}

function BoardItem({ board }: IBoardItemProps) {
  const dispatch = useAppDispatch();
  const [isEditeModal, setIsEditModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

  const handleConfirm = () => {
    dispatch(deleteBoard(board));
  };
  return (
    // <div className={`p-5 rounded border border-color1 cursor-pointer hover
    // :bg-color1 hover:text-white transition-colors duration-300 ${board.color}`}>
    <div className={`p-5 rounded border border-color1 cursor-pointer ${board.color}`}>
      <h2 className="text-2xl">{board.boardTitle}</h2>
      <div className="flex justify-between items-center">
        <button className="mr-3" title="edit card" aria-label="Edit card" type="button" onClick={() => setIsEditModal(true)}>
          <AiFillEdit className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1" />
        </button>
        <button type="button" title="delete card" aria-label="Delete card" onClick={() => setIsDeleteModal(true)}>
          <AiFillDelete className="w-6 h-6 transition-transform hover:scale-125 hover:text-color1" />
        </button>
      </div>
      {isEditeModal
        && (<BoardModal board={board} onClose={() => setIsEditModal(false)} mode="edit" />)}
      {isDeleteModal
        && (<Confirm onClose={() => setIsEditModal(false)} onConfirm={handleConfirm} text="" name="board" title={board.boardTitle} />)}
    </div>
  );
}

export default BoardItem;
