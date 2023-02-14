export interface IUser {
  id: number
  userName: string
  email: string
}

export interface IUserInfo {
  email: string
  password: string
}

export interface IUserInfoUpdate {
  id: number | undefined
  userName: string | undefined
  email: string | undefined
}
