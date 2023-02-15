import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useGlobalContext } from '../../context';

function AddBoard() {
  const [modalShow, setModalShow] = useState(false);
  const [boardName, setBoardName] = useState('');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const { boards, setBoards } = useGlobalContext();

  const handleAdd = () => {
    if (boardName.length > 0) {
      setBoards([...boards, {
        boardId: boards.length,
        boardTitle: boardName,
        boardColumns: [],
        order: boards.length,
      }]);
      setBoardName(() => '');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
  }, [modalShow]);

  const close = (flag: boolean) => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');

    setTimeout(() => {
      if (flag) handleAdd();
      setModalShow(false);
    }, 300);
  };

  return (
    <>
      <button
        className="btn sm:px-4 sm:py-3 font-semibold"
        type="button"
        onClick={() => setModalShow(true)}
      >
        + Add a new board
      </button>
      { modalShow ? (
        <div
          ref={modal}
          className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-400 bg-opacity-80 opacity-0 transition-opacity duration-300"
        >
          <div
            ref={modalContent}
            className="w-6/12 flex flex-col rounded-lg relative shadow-md bg-white px-6 py-3 -translate-y-10 duration-300 transition-transform"
          >
            <div className="flex flex-col-reverse justify-between items-center  pb-4">
              <h3 className="text-3xl font-semibold self-start">Add a new board</h3>
              <button
                className="px-1 text-gray-400 text-3xl self-end"
                type="button"
                onClick={() => close(false)}
              >
                <AiOutlineClose />
              </button>
            </div>
            <hr />
            <form className="py-4">
              <label htmlFor="board-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
                Board title
                <input
                  type="text"
                  id="board-name"
                  placeholder="Board title"
                  className="w-full bg-gray-200 text-lg text-gray-700 border-gray-400 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
              </label>
            </form>
            <hr />
            <div className="self-end">
              <button
                className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white"
                type="button"
                onClick={() => close(true)}
              >
                Add board
              </button>
            </div>
          </div>
        </div>
      )
        : null}
    </>
  );
}

export default AddBoard;
