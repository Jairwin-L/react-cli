import apiRequest from '../index'
import { USER, AUTH } from '../const'
import { ItemParam, UpdateParam } from '../param/auth'
import { CommonPageParam, IdParam } from '../common'

// 创建用户
export const list = (params: CommonPageParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.get(USER.LIST, params).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 用户详情
export const show = (params: IdParam): Promise<any> => {
  console.log(params);
  return new Promise((resolve, reject) => {
    apiRequest.get(USER.SHOW, params).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 创建用户
export const store = (data: ItemParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.post(USER.STORE, data).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 更新
export const update = (data: UpdateParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.put(USER.UPDATE, data).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 删除
export const destroy = (params: IdParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.delete(USER.DESTROY, params.id).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}