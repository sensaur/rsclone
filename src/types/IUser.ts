export interface IUser {
  id: number
  userName: string
  email: string
  avatar: string
}

export interface IUserInfo {
  email: string
  password: string
}

export interface IUserInfoUpdate {
  id?: string | Blob
  userName?: string | Blob
  email?: string | Blob
  avatar?: string | Blob
}
