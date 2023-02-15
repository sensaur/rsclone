import { IColumn } from './IColumn';

export interface IBoard {
  boardId: number
  boardTitle: string
  boardColumns: IColumn[]
  order: number
}
