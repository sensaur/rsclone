/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { ICard } from '../../types/IColumn';
import TInputTextArea from '../../types/Modals';

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
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescr, setErrorDescr] = useState('');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const inputTitle = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
    inputTitle.current?.focus();
  }, []);

  const handleInput = (event: TInputTextArea) => {
    const { name, value } = event.target;
    if (name === 'card-title') {
      setCardTitle(value);
      setErrorTitle('');
    }
    if (name === 'card-title' && value.trim() === '') {
      setErrorTitle('Enter card title to continue');
    }
    if (name === 'card-descr') {
      setCardDescr(value);
      setErrorDescr('');
    }
    if (name === 'card-descr' && value.trim() === '') {
      setErrorDescr('Enter card descr to continue');
    }
  };

  const formValidate = () => {
    if (cardTitle && cardDescr) {
      return true;
    }
    if (!cardTitle) {
      setErrorTitle('Enter card title to continue');
    }
    if (!cardDescr) {
      setErrorDescr('Enter card descr to continue');
    }
    return false;
  };

  const handleClose = () => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');
    setTimeout(() => {
      setErrorTitle('');
      setErrorDescr('');
      onClose(false);
    }, 300);
  };

  const handleAdd = () => {
    if (formValidate()) {
      const cardInfo = {
        id: mode ? card.id : Number(new Date()),
        order: mode ? card.order : 0,
        title: cardTitle.trim(),
        description: cardDescr.trim(),
        isDone: mode ? card.isDone : false,
        columnId: mode ? card.columnId : 1,
      };
      setCard(cardInfo);
      handleClose();
      setCardTitle('');
      setCardDescr('');
    }
  };

  const hendleKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div
      ref={modal}
      onKeyDownCapture={hendleKeyDown}
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
            onClick={() => handleClose()}
          >
            <AiOutlineClose />
          </button>
        </div>
        <hr />
        <form className="py-4">
          <div>
            <label htmlFor="card-title" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              {"Card's title"}
              <input
                type="text"
                id="card-title"
                name="card-title"
                ref={inputTitle}
                placeholder="Card title"
                className="w-full bg-gray-200 text-lg text-gray-700 border-gray-200 border rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white"
                required
                value={cardTitle}
                onChange={handleInput}
              />
            </label>
            <p className="text-red-500 text-center mt-2 mb-3">{errorTitle}</p>
          </div>
          <div>
            <label htmlFor="card-descr" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
              {"Card's description"}
              <textarea
                id="card-descr"
                name="card-descr"
                placeholder="Card description"
                className="w-full bg-gray-200 text-lg text-gray-700 border-gray-200 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                rows={5}
                required
                value={cardDescr}
                onChange={handleInput}
              />
            </label>
            <p className="text-red-500 text-center mt-2 mb-3">{errorDescr}</p>
          </div>
        </form>
        <hr />
        <div className="self-end">
          <button
            className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white"
            type="button"
            onClick={() => handleAdd()}
          >
            {mode ? 'Edit card' : 'Add card'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
