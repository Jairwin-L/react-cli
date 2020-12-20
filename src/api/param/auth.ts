import { IdParam } from '../common'
export interface ItemParam {
  username: string
  password: string
  roleId?: string
}

export type UpdateParam = IdParam & ItemParam
