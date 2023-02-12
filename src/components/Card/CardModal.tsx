import React, { useState } from 'react';
import { ICard } from '../../types/IColumn';

interface ICardModalProps {
  onClose: (e: boolean) => void
  addCard: (e: ICard) => void
}

function CardModal({ addCard, onClose }: ICardModalProps) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescr, setCardDescr] = useState('');

  const handleAdd = () => {
    onClose(false);
    const newCardInfo = {
      id: Number(new Date()),
      order: 1,
      title: cardTitle.trim(),
      description: cardDescr.trim(),
      isDone: false,
      columnId: 1,
    };
    addCard(newCardInfo);
    setCardTitle('');
    setCardDescr('');
  };

  return (
    <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-400 bg-opacity-80">
      <div className="w-6/12 flex flex-col rounded-lg relative shadow-md bg-white px-6 py-3">
        <div className="flex flex-col-reverse justify-between items-center  pb-4">
          <h3 className="text-3xl font-semibold self-start">Add a new card</h3>
          <button
            className="px-1 text-gray-400 text-3xl self-end"
            type="button"
            onClick={() => onClose(false)}
          >
            x
          </button>
        </div>
        <hr />
        <form className="py-4">
          <div>
            <label htmlFor="column-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              Card title
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
              Card description
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
            onClick={() => handleAdd()}
          >
            Add card
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
