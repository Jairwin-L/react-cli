import { CommonPageResponse } from '../common';

export interface Item {
  username: string;
  password: string;
}

export interface ListData extends CommonPageResponse {
  list: Item[] | any; // 列表
}

export interface ItemData {
  data: Item;
}
