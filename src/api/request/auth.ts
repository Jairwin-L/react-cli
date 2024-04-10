import apiRequest from "../index";
import { AUTH } from "../const";
import { ItemParam } from "../param/auth";

export const login = (data: ItemParam): Promise<any> => {
	return new Promise((resolve, reject) => {
		apiRequest.get(AUTH.LOGIN, data).then((res: any) => {
			resolve(res);
		}).catch((e: any) => {
			reject(e);
		});
	})
}
