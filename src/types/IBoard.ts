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
