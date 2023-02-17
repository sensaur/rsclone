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
    // :bg-color1 hover:text-white transition-colors duration-500 ${board.color}`}>
    <div className={`rounded border h-52 relative border-color1 flex flex-col justify-between group cursor-pointer overflow-hidden ${board.color}`}>
      <h2 className="p-5 text-2xl w-full h-14 text-ellipsis">{board.boardTitle}</h2>
      <div className="flex  px-5 pt-8 pb-8 justify-between items-center translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all group-hover:bg-color1 duration-500">
        <button className="mr-3 absolute right-2 text-white transition-all cursor-pointer opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:text-color4 duration-500" title="edit card" aria-label="Edit card" type="button" onClick={() => setIsEditModal(true)}>
          <AiFillEdit className="w-6 h-6" />
        </button>
        <button className="absolute cursor-pointer text-white transition-all opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:text-color4 duration-500" type="button" title="delete card" aria-label="Delete card" onClick={() => setIsDeleteModal(true)}>
          <AiFillDelete className="w-6 h-6" />
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
