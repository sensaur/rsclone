/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';

interface IEditTitle {
  title: string
  updateTitle: (e: string) => void
}

function EditTitle({ title, updateTitle }: IEditTitle) {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const save = () => {
    setIsEdit(false);
    updateTitle(inputRef.current?.value as string);
  };

  const edit = () => {
    setIsEdit(true);
  };

  const onKeyDown = ({ key }: React.KeyboardEvent) => {
    if (key === 'Enter') {
      save();
    }
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);

  if (isEdit) {
    return (
      <input
        ref={inputRef}
        onBlur={save}
        onKeyDown={onKeyDown}
        defaultValue={title}
      />
    );
  }

  return (
    <h2 onClick={edit}>{title.length > 0 ? title : 'Default title'}</h2>
  );
}

export default EditTitle;
