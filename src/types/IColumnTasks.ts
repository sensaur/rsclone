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

export interface ITask {
  id: string
  taskTitle: string
  order: number
  // description: string
  // isDone: boolean
  // columnId: number
}

export interface ITaskState {
  tasks: {
    [n: string]: ITask[]
  }
  isLoading: boolean
  error: string
}

export interface ITaskRes {
  col: string
  response: IColumnTasks
}

export interface ITaskUpdate {
  id: string
  taskTitle: string
  columnId: string
  order: number
}

export interface ITaskCreate {
  taskTitle: string
  order: number
  column_id: string
}

export interface ITaskCreateRes {
  taskTitle: string
  order: number
  column_id: string
  id: string
}

export interface ITaskDelete {
  id: string
  col: string
}

export interface IColumnTasks extends IColumn {
  Tasks: ITask[]
}

export interface IColumnAPI {
  order: number
  color: string
  id: string
  cardTitle: string
  Columns: IColumnTasks[]
}

export interface IColumnsState {
  columns: IColumn[]
  error: string
  isLoading: boolean
}

export interface IColumnCreate {
  columnTitle: string
  order?: number
  card_id: string
}

export interface IColumnUpdete {
  order: number
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
