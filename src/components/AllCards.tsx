import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getAllCards } from '../redux/ac/card.ac';
import { deleteUserSlice } from '../redux/slices/userSlice';
import CardHeader from './Cards/CardHeader';
import CardItem from './Cards/CardItem';
import CardModal from './Cards/CardModal';

function AllCards() {
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cards, error } = useAppSelector((store) => store.cardSlice);
  useEffect(() => {
    dispatch(getAllCards());
  }, []);
  if (error) {
    dispatch(deleteUserSlice());
    navigate('/logout');
  }

  const renderedCards = cards.map((card) => (
    <CardItem
      key={card.cardTitle}
      card={card}
    />
  ));
  return (
    <div className="container mx-auto px-6">
      <CardHeader>
        <button
          className="btn sm:px-4 sm:py-3 font-semibold"
          type="button"
          onClick={() => setIsModalShow(true)}
        >
          + Add a new board
        </button>
        {isModalShow && <CardModal card={null} onClose={() => setIsModalShow(false)} mode="create" />}
      </CardHeader>
      <hr />
      {cards.length === 0
        && (
        <div className="w-full flex flex-col items-center justify-center p-5">
          <h2 className="text-3xl">There are no boards</h2>
          <p className="text-3xl">But you can create as many as you like!</p>
        </div>
        )}
      {cards.length > 0
        && <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 py-5">{renderedCards}</div>}
    </div>
  );
}

export default AllCards;
