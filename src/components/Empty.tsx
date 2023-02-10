import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteUserSlice } from '../redux/slices/userSlice';
import Columns from './Columns';

function Empty() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    document.title = 'RS Clone';
  }, []);
  const handleClick = () => {
    dispatch(deleteUserSlice());
  };

  return (
    <div className="container">
      <h1>Трелло клон</h1>
      {user && <button type="button" onClick={handleClick}>Разлогиниться</button>}
      <Columns />
    </div>
  );
}

export default Empty;
