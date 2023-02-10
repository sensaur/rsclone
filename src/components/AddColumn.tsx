import React, { useState } from 'react';
import { IColumn } from '../types/IColumn';

interface IAddcolumnProps {
  columns: IColumn[]
  setColumns: (e: IColumn[]) => void
}

function AddColumn({ columns, setColumns }: IAddcolumnProps) {
  const [modalShow, setModalShow] = useState(false);
  const [columnName, setColumnName] = useState('');

  const handleAdd = () => {
    if (columnName.length > 0) {
      setModalShow(false);
      setColumns([...columns, {
        id: Number(new Date()), title: columnName, cards: [], order: columns.length + 1,
      }]);
    }
  };

  return (
    <>
      <button
        className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white"
        type="button"
        onClick={() => setModalShow(true)}
      >
        + Добавить новую колонку
      </button>
      { modalShow ? (
        <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-400 bg-opacity-80">
          <div className="w-6/12 flex flex-col rounded-lg relative shadow-md bg-white px-6 py-3">
            <div className="flex flex-col-reverse justify-between items-center  pb-4">
              <h3 className="text-3xl font-semibold self-start">Добавить новую колонку</h3>
              <button
                className="px-1 text-gray-400 text-3xl self-end"
                type="button"
                onClick={() => setModalShow(false)}
              >
                x
              </button>
            </div>
            <hr />
            <form className="py-4">
              <label htmlFor="column-name" className="block track-wide uppercase text-gray-700 text-xs font-semibold mb-2">
                Название колонки
                <input
                  type="text"
                  id="column-name"
                  placeholder="Название колонки"
                  className="w-full bg-gray-200 text-lg text-gray-700 border-gray-400 border rounded py-3 px-4 mt-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  required
                  value={columnName}
                  onChange={(e) => setColumnName(e.target.value)}
                />
              </label>
            </form>
            <hr />
            <div className="self-end">
              <button
                className="rounded-lg text-purple-100 text-2xl font-semibold bg-blue-500 my-3 p-3 block transition-colors hover:text-black hover:bg-blue-300 duration-300 active:bg-blue-800 active:text-white"
                type="button"
                onClick={handleAdd}
              >
                Добавить колонку
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
