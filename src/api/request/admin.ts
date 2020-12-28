import apiRequest from "../index";
import { USER } from "../const";
import { CommonPageParam } from "../common";
// 创建用户
export const list = (params: CommonPageParam): Promise<any> => {
	return new Promise((resolve, reject) => {
		apiRequest.get(USER.LIST, params).then((res: any) => {
			resolve(res);
		}).catch((e: any) => {
			reject(e);
		})
	})
}
