import { CommonPageResponse, IdParam } from '../common'

export interface Item extends IdParam {
  username: string
  password: string
}

export interface ListData extends CommonPageResponse {
  list: Item[] | any // 列表
}

interface GetList extends CommonPageResponse {
  list: Item[] | any // 列表
}

export interface ItemData {
  data: Item
}