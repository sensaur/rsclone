// import { useGlobalContext } from '../context';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
// import { useAppSelector } from '../hooks/redux';
import { getAllBoards } from '../redux/ac/board.ac';
import BoardHeader from './Boards/BoardHeader';
import BoardItem from './Boards/BoardItem';
import BoardModal from './Boards/BoardModal';

function AllBoards() {
  // const { boards } = useGlobalContext();
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { boards, error } = useAppSelector((store) => store.boardSlice);
  useEffect(() => {
    dispatch(getAllBoards());
  }, []);
  console.log('boards=', boards, 'errors', error);

  const renderedBoards = boards.map((board) => (
    <BoardItem
      key={board.boardTitle}
      board={board}
    />
  ));
  return (
    <div className="container mx-auto px-6">
      <BoardHeader>
        <button
          className="btn sm:px-4 sm:py-3 font-semibold"
          type="button"
          onClick={() => setIsModalShow(true)}
        >
          + Add a new board
        </button>
        {isModalShow && <BoardModal board={null} onClose={() => setIsModalShow(false)} mode="create" />}
      </BoardHeader>
      <hr />
      {boards.length === 0
        && (
        <div className="w-full flex flex-col items-center justify-center p-5">
          <h2 className="text-3xl">There are no boards</h2>
          <p className="text-3xl">But you can create as many as you like!</p>
        </div>
        )}
      {boards.length > 0
        && <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 py-5">{renderedBoards}</div>}
    </div>
  );
}

export default AllBoards;
