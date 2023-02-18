import { IColumn } from './IColumn';

export interface ICadsState {
  cards: ICardAPI[]
  isLoading: boolean
  error: string
}

export interface ICard {
  cardId: number
  cardTitle: string
  cardColumns: IColumn[]
  order: number
}

export interface ICreateCard {
  cardTitle: string,
  color: string,
  order: number,
  // columns: []
}

export interface ICardAPI {
  order: number
  color: string
  cardUUID: string
  cardTitle: string
  User: {
    userName: string
    userUUID: string
  }
}
