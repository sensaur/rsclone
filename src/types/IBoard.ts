import { IColumn } from './IColumn';

export interface IBoadsState {
  boards: IBoardAPI[]
  isLoading: boolean
  error: string
}

export interface IBoard {
  boardId: number
  boardTitle: string
  boardColumns: IColumn[]
  order: number
}

export interface ICreateBoard {
  boardTitle: string,
  color: string,
  order: number,
  // columns: []
}

export interface IBoardAPI {
  order: number
  color: string
  boardUUID: string
  boardTitle: string
  User: {
    userName: string
    userUUID: string
  }
}
