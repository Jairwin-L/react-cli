import { CommonPageResponse } from "../common"
export interface Item {
  id?: string | undefined;
  title: string;
  content: string;
  coverUrl: string;
  sort: number;
  createTime: string;
  updateTime?: string;
  tag: string;
  note: string;
  times: number
}

export interface ListData {
  data: GetList;
}

interface GetList extends CommonPageResponse {
  list: Item[]; // 列表
}

export interface ItemData {
  data: Item;
}
