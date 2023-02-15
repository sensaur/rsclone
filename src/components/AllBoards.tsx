import { useGlobalContext } from '../context';
import AddBoard from './Boards/addBoard';
import BoardHeader from './Boards/BoardHeader';
import BoardItem from './Boards/BoardItem';

function AllBoards() {
  const { boards } = useGlobalContext();
  const renderedBoards = boards.map((board) => (
    <BoardItem
      key={board.boardId}
      boardId={board.boardId}
    />
  ));
  return (
    <div className="container mx-auto px-6">
      <BoardHeader>
        <AddBoard />
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
