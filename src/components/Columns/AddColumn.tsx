/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IColumn } from '../../types/IColumn';

interface IAddcolumnProps {
  setColumns: (value: React.SetStateAction<IColumn[]>) => void
}

function AddColumn({ setColumns }: IAddcolumnProps) {
  const [modalShow, setModalShow] = useState(false);
  const [columnName, setColumnName] = useState('');
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = () => {
    if (columnName.length > 0) {
      setColumns((prev) => [...prev, {
        id: Number(new Date()), title: columnName, cards: [], order: prev.length + 1,
      }]);
      setColumnName(() => '');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
    inputRef.current?.focus();
  }, [modalShow]);

  const close = (flag: boolean) => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');

    setTimeout(() => {
      if (flag) handleAdd();
      setModalShow(false);
    }, 300);
  };

  const hendleKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Escape') {
      close(false);
    }
  };

  return (
    <>
      <button
        className="btn sm:px-4 sm:py-3 font-semibold"
        type="button"
        onClick={() => setModalShow(true)}
      >
        + Add a new column
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
              <h3 className="text-3xl font-semibold self-start">Add a new column</h3>
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
              <label htmlFor="column-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
                Column title
                <input
                  type="text"
                  id="column-name"
                  placeholder="Column title"
                  className="w-full bg-gray-200 text-lg text-gray-700 border-gray-400 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required
                  value={columnName}
                  onKeyDown={hendleKeyDown}
                  ref={inputRef}
                  onChange={(e) => setColumnName(e.target.value)}
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
                Add column
              </button>
            </div>
          </div>
        </div>
      )
        : null}
    </>
  );
}

export default AddColumn;
