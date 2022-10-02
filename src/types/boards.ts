import { IUser } from "./IUser"

interface IBoardSubject {
  id: number
  name: string
}

export interface IBoard {
  admin: IUser[]
  id: number
  members: IUser[]
  name: string
  subject: IBoardSubject
}
