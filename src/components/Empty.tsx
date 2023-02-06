import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteUserSlice } from '../redux/slices/userSlice';

function Empty() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userSlice);
  useEffect(() => {
    document.title = 'RS Clone';
  }, []);
  const handleClick = () => {
    dispatch(deleteUserSlice());
    console.log('клик');
  };
  return (
    <div className="container">
      <h1>Трелло клон</h1>
      {user && <button type="button" onClick={handleClick}>Разлогиниться</button>}
    </div>
  );
}

export default Empty;
