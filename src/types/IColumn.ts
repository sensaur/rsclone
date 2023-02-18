export interface ITask {
  id: number
  title: string
  description: string
  isDone: boolean
  order: number
  columnId: number
}

export interface IColumn {
  id: number
  title: string
  order: number
  tasks: ITask[]
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
