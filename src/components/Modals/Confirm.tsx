import React, { useEffect, useRef } from 'react';

interface IConfirmProps {
  title: string
  text: string
  name: string
  onClose: () => void
  onConfirm: () => void
}

function Confirm({
  text, onClose, onConfirm, title, name,
}: IConfirmProps) {
  const modal = useRef<HTMLDivElement | null>(null);
  const modalContent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.remove('opacity-0');
      modalContent.current?.classList.remove('-translate-y-10');
    });
  }, []);

  const close = (fn: () => void) => {
    modal.current?.classList.add('opacity-0');
    modalContent.current?.classList.add('-translate-y-10');
    setTimeout(() => {
      fn();
    }, 300);
  };

  return (
    <div
      ref={modal}
      className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-400 bg-opacity-80 opacity-0 transition-opacity duration-300"
    >
      <div
        ref={modalContent}
        className="lg:w-4/12 sm:w-6/12 flex flex-col rounded-lg relative shadow-md bg-white px-6 py-3 -translate-y-10 duration-300 transition-transform"
      >
        <div className="flex flex-col-reverse justify-between items-center pb-4">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Are you sure you want to delete a
              {' '}
              {name}
              {' '}
              {`"${title}"`}
              ?
            </h2>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {text ? 'All of your data will be permanently removed. This action cannot be undone.' : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => close(onConfirm)}
          >
            Confirm
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => close(onClose)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
