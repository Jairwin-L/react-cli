import { message } from 'antd'
import fly from 'flyio'
import config from './config'

interface CommonResponse {
  code: number
  msg: string
}

fly.interceptors.request.use((request: any) => {
  if (sessionStorage.getItem('token')) request.headers['token'] = sessionStorage.getItem('token')
  request.headers['Content-Type'] = 'application/json'
  request.headers['Accept'] = 'application/json'
  return request
})

function responseMessage(msg: string, statusCode?: number) {
  if (msg) statusCode === 1 ? message.success(msg) : message.error(msg)
}

class ApiRequest {
  private static instance: ApiRequest
  private BASE_URL: string = ''
  private constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL
  }
  public static getInstance(BASE_URL: string) {
    if (!this.instance) this.instance = new ApiRequest(BASE_URL)
    return this.instance
  }
  public async get(url: string, params: any = {}): Promise<any> {
    const res: any = params.id ? await fly.get(`${this.BASE_URL}${url}/${params.id}`) : await fly.get(`${this.BASE_URL}${url}`, params)
    const data: CommonResponse = res.data
    const statusCode = Number(data.code)
    return new Promise((resolve, reject) => {
      if (statusCode === 1) {
        responseMessage(data.msg, 1)
        resolve(res.data)
      } else if (statusCode === 0) {
        responseMessage(data.msg, 0)
        reject(data.msg)
      } else if (statusCode === 401) {
        responseMessage(data.msg, 401)
        reject(data.msg)
      } else {
        responseMessage(data.msg)
        reject(data.msg)
      }
    })
  }
  public async post(url: string, obj: any = {}): Promise<any> {
    const res: any = await fly.post(`${this.BASE_URL}${url}`, obj)
    const data: CommonResponse = res.data
    const statusCode = Number(data.code)
    return new Promise((resolve, reject) => {
      if (statusCode === 1) {
        responseMessage(data.msg, 1)
        resolve(res)
      } else if (statusCode === 0) {
        responseMessage(data.msg, 0)
        reject(data.msg)
      } else {
        responseMessage(data.msg)
        reject(data.msg)
      }
    })
  }
  public async delete(url: string, params: any = {}): Promise<any> {
    const res: any = await fly.delete(`${this.BASE_URL}${url}/${params}`)
    const data: CommonResponse = res.data
    const statusCode = Number(data.code)
    return new Promise((resolve, reject) => {
      if (statusCode === 1) {
        responseMessage(data.msg, 1)
        resolve(res)
      } else {
        responseMessage(data.msg)
        reject(data.msg)
      }
    })
  }
  public async put(url: string, obj: any = {}): Promise<any> {
    const res: any = await fly.put(`${this.BASE_URL}${url}`, obj)
    const data: CommonResponse = res.data
    const statusCode = Number(data.code)
    return new Promise((resolve, reject) => {
      if (statusCode === 1) {
        responseMessage(data.msg, 1)
        resolve(res)
      } else {
        responseMessage(data.msg)
        reject(data.msg)
      }
    })
  }
}

export default ApiRequest.getInstance(config.BASE_URL)
