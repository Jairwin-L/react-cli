import { CommonPageResponse, IdParam } from '../common'
export interface Item extends IdParam {
  title: string
  content: string
  coverUrl: string
  sort: number
  createTime: string
  updateTime?: string
  tag: string
  note: string
}

export interface ListData extends CommonPageResponse {
  list: Item[] | any// 列表
}

export interface ItemData {
  data: Item
}
