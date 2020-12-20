import apiRequest from '../index'
import { AUTH } from '../const'
import { ItemParam } from '../param/auth'

// 获取列表信息
export const login = (data: ItemParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.post(AUTH.LOGIN, data).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}
