import { createContext, useContext } from 'react';
import { IBoard } from '../types/IBoard';

export type GlobalContext = {
  boards: IBoard[]
  setBoards: (c: IBoard[]) => void
};

export const BoardsContext = createContext<GlobalContext>({
  boards: [],
  setBoards: () => {},
});

export const useGlobalContext = () => useContext(BoardsContext);
