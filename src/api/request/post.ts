import apiRequest from "../index"
import { POST } from "../const"
import { CommonPageParam } from "../../interface/common"

// 获取列表信息
export const list = (params: CommonPageParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.get(POST.LIST, params).then((res: any) => {
      resolve(res);
    }).catch((e: any) => {
      reject(e);
    });
  });
};
