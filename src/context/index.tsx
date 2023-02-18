import { createContext, useContext } from 'react';
import { ICard } from '../types/ICard';

export type GlobalContext = {
  cards: ICard[]
  setBoards: (c: ICard[]) => void
};

export const BoardsContext = createContext<GlobalContext>({
  cards: [],
  setBoards: () => {},
});

export const useGlobalContext = () => useContext(BoardsContext);
