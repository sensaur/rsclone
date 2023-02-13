/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useRef, useState } from 'react';
import { ICard } from '../../types/IColumn';

interface ICardModalProps {
  onClose: (e: boolean) => void
  setCard: (e: ICard) => void
  mode: boolean
  card: ICard
}

function CardModal({
  setCard, onClose, mode, card,
}: ICardModalProps) {
  const [cardTitle, setCardTitle] = useState(mode ? card.title : '');
  const [cardDescr, setCardDescr] = useState(mode ? card.description : '');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
  }, []);

  const handleAdd = () => {
    const cardInfo = {
      id: mode ? card.id : Number(new Date()),
      order: mode ? card.order : 0,
      title: cardTitle.trim(),
      description: cardDescr.trim(),
      isDone: mode ? card.isDone : false,
      columnId: mode ? card.columnId : 1,
    };
    setCard(cardInfo);
    setCardTitle('');
    setCardDescr('');
  };

  const handleClose = (flag: boolean) => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');
    setTimeout(() => {
      if (flag) handleAdd();
      onClose(false);
    }, 300);
  };

  return (
    <div
      ref={modal}
      className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-400 bg-opacity-80 opacity-0 transition-opacity duration-300"
    >
      <div
        ref={modalContent}
        className="w-6/12 flex flex-col rounded-lg relative shadow-md bg-white px-6 py-3 -translate-y-10 duration-300 transition-transform"
      >
        <div className="flex flex-col-reverse justify-between items-center pb-4">
          <h3 className="text-3xl font-semibold self-start">
            {mode ? 'Edit the card' : 'Add a new card'}
          </h3>
          <button
            className="px-1 text-gray-400 text-3xl self-end"
            type="button"
            onClick={() => handleClose(false)}
          >
            x
          </button>
        </div>
        <hr />
        <form className="py-4">
          <div>
            <label htmlFor="column-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              {"Card's title"}
              <input
                type="text"
                id="column-name"
                placeholder="Card title"
                className="w-full bg-gray-200 text-lg text-gray-700 border-gray-200 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                required
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="column-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              {"Card's description"}
              <textarea
                id="column-name"
                placeholder="Card description"
                className="w-full bg-gray-200 text-lg text-gray-700 border-gray-200 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                rows={5}
                required
                value={cardDescr}
                onChange={(e) => setCardDescr(e.target.value)}
              />
            </label>
          </div>
        </form>
        <hr />
        <div className="self-end">
          <button
            className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white"
            type="button"
            onClick={() => handleClose(true)}
          >
            {mode ? 'Edit card' : 'Add card'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
