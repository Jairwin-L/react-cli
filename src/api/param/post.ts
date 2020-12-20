import { IdParam } from '../common'

export interface ItemParam {
  title: string
  content: string,
  note: string,
  coverUrl?: string,
  sort: any,
  tag?: string,
}

export type UpdateParam = IdParam & ItemParam
