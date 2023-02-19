// eslint-disable-next-line import/no-cycle
import { ICardAPI } from './ICard';

export interface ITask {
  id: string
  taskTitle: string
  order: number
  // description: string
  // isDone: boolean
  // columnId: number
}

export interface IColumn {
  id: string
  columnTitle: string
  order: number
  // tasks: ITask[]
}

export interface ISwap {
  id: string
  order: number
}

// {
//   "columnTitle": "NB column title 1",
//   "id": "526e341d-5790-41c8-9fcd-09ce0c641435",
//   "order": 5,
//   "Tasks": [
//       {
//           "taskTitle": "NB task title 1",
//           "order": 1,
//           "id": "09f178bd-6521-4195-8a08-468745d79869"
//       },
//       {
//           "taskTitle": "NB task title 2",
//           "order": 2,
//           "id": "f56d1a6b-df25-43b4-a5ca-f94ed4d280d9"
//       }
//   ]
// }

export interface IColumnTasks extends IColumn {
  Tasks: ITask[]
}

export interface IColumnAPI extends ICardAPI {
  Columns: IColumnTasks[]
}

export interface IColumnsState {
  columns: IColumnAPI
  error: string
  isLoading: boolean
}

export interface IColumnCreate {
  columnTitle: string
  order?: number
  card_id: string
}

export interface IColumnUpdete {
  order?: number
  columnTitle: string
  id: string
}

export interface IColumnProps {
  title: string
  column: IColumn
  start: (e: React.DragEvent<HTMLDivElement>, column: IColumn) => void
  leave: (e: React.DragEvent<HTMLDivElement>) => void
  end: (e: React.DragEvent<HTMLDivElement>) => void
  over: (e: React.DragEvent<HTMLDivElement>) => void
  drop: (e: React.DragEvent<HTMLDivElement>, column: IColumn) => void
  children: React.ReactNode
}
