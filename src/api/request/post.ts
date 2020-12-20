import apiRequest from '../index'
import { POST } from '../const'
import { UpdateParam, ItemParam } from '../param/post'
import { CommonPageParam, IdParam } from '../common'

// 获取列表信息CommonPageParam
export const list = (params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.get(POST.LIST, params).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

export const show = (params: IdParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.get(POST.SHOW, params).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 创建
export const store = (data: ItemParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.post(POST.STORE, data).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 编辑
export const update = (params: UpdateParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.put(POST.UPDATE, params).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}

// 删除
export const destroy = (params: IdParam): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiRequest.delete(POST.DESTROY, params.id).then((res: any) => {
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    })
  })
}
